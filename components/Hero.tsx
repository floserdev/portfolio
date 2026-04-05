import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section>
      <h1 className="text-4xl font-bold fade-up delay-2">
        {siteConfig.profile.name}
      </h1>
      <h2 className="text-3xl font-bold text-gray-400 leading-snug mb-2 fade-up delay-3">
        {siteConfig.profile.title}
      </h2>
      <p
        className="text-sm text-gray-400 mb-2 fade-up delay-4"
        dangerouslySetInnerHTML={{ __html: siteConfig.profile.intro }}
      />
      <p
        className="text-sm text-gray-400 leading-relaxed max-w-2xl fade-up delay-5"
        dangerouslySetInnerHTML={{ __html: siteConfig.profile.description }}
      />
    </section>
  );
}
