import { siteConfig } from "@/lib/siteConfig";
import { InstagramIcon, EmailIcon, ChevronRightIcon } from "./icons/SocialIcons";

const CONTACT_ICONS = {
  instagram: InstagramIcon,
  email: EmailIcon,
};

export default function Contact() {
  return (
    <section className="mt-16 mb-8">
      <h3 className="text-2xl font-semibold fade-up delay-7">Contact Me</h3>
      <p className="text-sm text-gray-500 mb-4 fade-up delay-7">
        Feel free to reach out through any of these platforms.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {siteConfig.contact.items.map((contact) => {
          const IconComponent = CONTACT_ICONS[contact.icon];
          const isInstagram = contact.icon === "instagram";
          const iconBoxClass = isInstagram
            ? `bg-gradient-to-br ${contact.gradient}`
            : "bg-zinc-800/40";

          return (
            <a
              key={contact.name}
              href={contact.url}
              target={contact.icon === "email" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="contact-card group p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm fade-up delay-8 hover:bg-zinc-900/60 transition-all duration-300"
              style={
                {
                  "--accent": contact.color,
                  "--accent-glow": `${contact.color}40`,
                } as React.CSSProperties
              }
            >
              <div className="flex items-center gap-4">
                <div
                  className={`contact-icon w-11 h-11 rounded-lg ${iconBoxClass} flex items-center justify-center flex-shrink-0`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {contact.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {contact.handle}
                  </p>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
