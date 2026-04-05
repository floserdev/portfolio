import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { GitHubIcon, ArrowRightIcon, ChevronRightIcon } from "./icons/SocialIcons";

export default function Projects() {
  return (
    <section className="mt-16">
      <h3 className="text-2xl font-semibold fade-up delay-6">
        {siteConfig.projects.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 fade-up delay-6">
        {siteConfig.projects.subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {siteConfig.projects.items.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-7 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800/40 flex items-center justify-center flex-shrink-0">
                <Image
                  src={siteConfig.projects.icon}
                  alt="Project"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-semibold group-hover:text-white transition-colors">
                  {project.name}
                </p>
                <p className="text-xs text-gray-500">{project.description}</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
            </div>
          </a>
        ))}
      </div>
      <a
        href={siteConfig.projects.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-3 w-full p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-7 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all duration-300 flex items-center justify-center gap-3"
      >
        <GitHubIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
          View my open-source projects
        </span>
        <ArrowRightIcon className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </a>
    </section>
  );
}
