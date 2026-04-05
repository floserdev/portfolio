"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  DISCORD_USER_ID,
  LanternUser,
  LanternActivity,
  fetchLanternUser,
  formatElapsedTime,
  getActivityType,
  getStatusColor,
  getStatusText,
} from "@/lib/lantern";
import { DiscordIcon, SpotifyIcon } from "./icons/SocialIcons";

interface SpotifyProgress {
  current: number;
  total: number;
  percentage: number;
}

export default function StatusCards() {
  const [lanternData, setLanternData] = useState<LanternUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [spotifyProgress, setSpotifyProgress] = useState<SpotifyProgress>({
    current: 0,
    total: 0,
    percentage: 0,
  });
  const [discordElapsed, setDiscordElapsed] = useState("");

  const fetchData = useCallback(async () => {
    const data = await fetchLanternUser(DISCORD_USER_ID);
    setLanternData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const sp = lanternData?.active_platforms?.spotify;
    const spActivity = lanternData?.activities?.find((a) => {
      const t = typeof a.type === "number" ? a.type : parseInt(a.type, 10);
      return t === 2;
    });

    if (!sp && !spActivity) return;

    let startMs = 0;
    let endMs = 0;

    if (sp) {
      startMs = sp.start_time.unix > 1e12 ? sp.start_time.unix : sp.start_time.unix * 1000;
      endMs = sp.end_time.unix > 1e12 ? sp.end_time.unix : sp.end_time.unix * 1000;
    } else if (spActivity?.timestamps?.start_time && spActivity?.timestamps?.end_time) {
      const s = spActivity.timestamps.start_time.unix;
      const e = spActivity.timestamps.end_time.unix;
      startMs = s > 1e12 ? s : s * 1000;
      endMs = e > 1e12 ? e : e * 1000;
    } else {
      return;
    }

    const totalDurationSec = Math.floor((endMs - startMs) / 1000);

    const updateProgress = () => {
      const now = Date.now();
      const elapsedSec = Math.floor((now - startMs) / 1000);
      const clampedElapsed = Math.max(0, Math.min(elapsedSec, totalDurationSec));
      const percentage = totalDurationSec > 0
        ? Math.min((clampedElapsed / totalDurationSec) * 100, 100)
        : 0;

      setSpotifyProgress({
        current: clampedElapsed,
        total: totalDurationSec,
        percentage,
      });
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [lanternData]);

  useEffect(() => {
    const activity = getMainActivity();
    if (!activity?.timestamps?.start_time) return;

    const updateElapsed = () => {
      setDiscordElapsed(formatElapsedTime(activity.timestamps!.start_time!.unix));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 60000);
    return () => clearInterval(interval);
  }, [lanternData?.activities]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const getMainActivity = (): LanternActivity | null => {
    if (!lanternData?.activities?.length) return null;
    return lanternData.activities.find((a) => {
      const t = typeof a.type === "number" ? a.type : parseInt(a.type, 10);
      return t !== 4 && t !== 2;
    }) || null;
  };

  const getSpotifyActivity = (): LanternActivity | null => {
    if (!lanternData?.activities?.length) return null;
    return lanternData.activities.find((a) => {
      const t = typeof a.type === "number" ? a.type : parseInt(a.type, 10);
      return t === 2;
    }) || null;
  };

  const spotify = lanternData?.active_platforms?.spotify;
  const spotifyActivity = getSpotifyActivity();
  const hasSpotify = !!spotify || !!spotifyActivity;
  const activity = getMainActivity();
  const status = lanternData?.status || "offline";

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-6 animate-pulse h-24" />
        <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-7 animate-pulse h-24" />
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Discord Card */}
      <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-6 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300">
        <div className="flex items-center gap-3">
          {activity?.assets?.large_image?.image_url ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={activity.assets.large_image.image_url}
                alt={activity.assets.large_image.text || activity.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
              <DiscordIcon className="w-5 h-5 text-indigo-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-indigo-400 font-medium mb-0.5">
              Discord
            </p>
            {activity ? (
              <>
                <p className="text-sm text-white font-medium truncate">
                  {getActivityType(activity.type)} {activity.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {activity.details || activity.state || activity.assets?.large_image?.text || ""}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500 font-medium">
                Not doing anything right now
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <span
              className={`w-2.5 h-2.5 ${getStatusColor(status)} rounded-full block status-dot`}
            ></span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 ${getStatusColor(status)} rounded-full block status-dot`}></span>
            <span className="text-[10px] text-gray-500">{getStatusText(status)}</span>
          </div>
          {activity?.timestamps?.start_time && (
            <span className="text-[10px] text-gray-600">
              {discordElapsed}
            </span>
          )}
        </div>
      </div>

      {/* Spotify Card */}
      <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-7 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300">
        <div className="flex items-center gap-3">
          {hasSpotify && spotify?.album_cover ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={spotify.album_cover}
                alt={spotify.album}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          ) : hasSpotify && spotifyActivity?.assets?.large_image?.image_url ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={spotifyActivity.assets.large_image.image_url}
                alt={spotifyActivity.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <SpotifyIcon className={`w-6 h-6 ${hasSpotify ? "text-green-500" : "text-green-500/40"}`} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium mb-0.5 ${hasSpotify ? "text-green-500" : "text-green-500/40"}`}>
              {hasSpotify ? "Listening to Spotify" : "Spotify"}
            </p>
            {hasSpotify ? (
              <>
                <p className="text-sm text-white font-medium truncate">
                  {spotify?.song || spotifyActivity?.details}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {spotify?.artist || spotifyActivity?.state}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500 font-medium">
                Not listening to anything
              </p>
            )}
          </div>
          {hasSpotify && (
            <div className="flex items-end gap-[3px] h-5">
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
              <div className="eq-bar"></div>
            </div>
          )}
        </div>
        {hasSpotify ? (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-gray-500 w-8 text-right">
              {formatTime(spotifyProgress.current)}
            </span>
            <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000"
                style={{ width: `${spotifyProgress.percentage}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-500 w-8">
              {formatTime(spotifyProgress.total)}
            </span>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-gray-600 w-8 text-right">0:00</span>
            <div className="flex-1 h-1 bg-zinc-800/50 rounded-full" />
            <span className="text-[10px] text-gray-600 w-8">0:00</span>
          </div>
        )}
      </div>
    </div>
  );
}
