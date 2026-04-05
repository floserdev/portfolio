import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function Technologies() {
  return (
    <section className="mt-16">
      <h3 className="text-2xl font-semibold fade-up delay-6">
        {siteConfig.technologies.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 fade-up delay-6">
        {siteConfig.technologies.subtitle}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {siteConfig.technologies.items.map((tech) => (
          <div
            key={tech.name}
            className="group p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-7 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col items-center gap-2"
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className="w-10 h-10 group-hover:scale-110 transition-transform"
            />
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
