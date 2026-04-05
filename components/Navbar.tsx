import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { DiscordIcon, GitHubIcon } from "./icons/SocialIcons";
import ThemeToggle from "./ThemeToggle";

const SOCIAL_ICONS = {
  discord: DiscordIcon,
  github: GitHubIcon,
};

export default function Navbar() {
  return (
    <nav className="pt-10 shrink-0">
      <div className="max-w-[50rem] mx-auto flex items-center justify-between px-6 md:px-0">
        <div className="fade-up delay-1">
          <div className="w-10 h-10 rounded-full p-[2px] avatar-glow avatar-shadow">
            <Image
              src={siteConfig.profile.avatar}
              alt="Avatar"
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-medium text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-md border border-zinc-800/50 tracking-wider fade-up delay-1">
            {siteConfig.profile.version}
          </span>
          <div className="flex items-center gap-3">
            {siteConfig.socials.map((social) => {
              const IconComponent = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-zinc-600 hover:border-zinc-400 hover:scale-110 transition-all duration-300 flex items-center justify-center fade-up delay-1"
                >
                  <IconComponent className="w-4 h-4 text-gray-300" />
                </a>
              );
            })}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
