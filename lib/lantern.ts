export const DISCORD_USER_ID = "1009413946270285854";

export interface LanternSpotify {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_cover: string;
  start_time: {
    unix: number;
    raw: string;
  };
  end_time: {
    unix: number;
    raw: string;
  };
  time: {
    current_human_readable: string;
    end_human_readable: string;
  };
}

export interface LanternActivity {
  id?: string;
  name: string;
  type: number | string;
  state?: string | null;
  details?: string | null;
  application_id?: string;
  created_at?: number;
  assets?: {
    large_image?: {
      hash: string;
      image_url: string;
      text: string;
    };
    small_image?: {
      hash: string;
      image_url: string;
      text: string;
    };
  };
  timestamps?: {
    start_time?: {
      unix: number;
      raw: string;
    };
    end_time?: {
      unix: number;
      raw: string;
    };
  };
}

export interface LanternUser {
  metadata: {
    id: string;
    username: string;
    discriminator: string;
    global_name: string;
    avatar: string;
    avatar_url: string;
    display_avatar_url: string;
    bot: boolean;
    flags: {
      human_readable: string[];
      bitfield: number;
    };
    monitoring_since: {
      unix: number;
      raw: string;
    };
  };
  active_platforms: {
    desktop: string;
    mobile: string;
    web: string;
    spotify?: LanternSpotify;
  };
  activities: LanternActivity[];
  storage: Record<string, string>;
  server_tag?: {
    guild_id: string;
    name: string;
    icon_url: string;
  };
  status: string;
  last_seen_at: {
    unix: number;
    raw: string;
  } | null;
}

export async function fetchLanternUser(userId: string): Promise<LanternUser | null> {
  try {
    const response = await fetch(`https://lantern.rest/api/v1/users/${userId}`, {
      next: { revalidate: 0 },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Lantern API error:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Lantern API fetch error:", error);
    return null;
  }
}

export function formatElapsedTime(startUnix: number): string {
  const startMs = startUnix > 1e12 ? startUnix : startUnix * 1000;
  const now = Date.now();
  const elapsed = Math.floor((now - startMs) / 1000);

  if (elapsed < 0) return "just now";

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m elapsed`;
  }
  return `${minutes}m elapsed`;
}

export function getActivityType(type: number | string): string {
  const typeNum = typeof type === "number" ? type : parseInt(type, 10);
  switch (typeNum) {
    case 0:
      return "Playing";
    case 1:
      return "Streaming";
    case 2:
      return "Listening to";
    case 3:
      return "Watching";
    case 4:
      return "";
    case 5:
      return "Competing in";
    default:
      return "";
  }
}

export function isCustomStatus(type: number | string): boolean {
  const typeNum = typeof type === "number" ? type : parseInt(type, 10);
  return typeNum === 4;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "idle":
      return "bg-yellow-500";
    case "dnd":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusText(status: string): string {
  switch (status) {
    case "online":
      return "Online";
    case "idle":
      return "Idle";
    case "dnd":
      return "Do Not Disturb";
    case "offline":
      return "Offline";
    default:
      return "Unknown";
  }
}
