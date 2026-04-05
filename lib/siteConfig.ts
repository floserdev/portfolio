export interface SocialLink {
  name: string;
  url: string;
  icon: "discord" | "github";
}

export interface Project {
  name: string;
  description: string;
  url: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface ContactItem {
  name: string;
  handle: string;
  url: string;
  icon: "instagram" | "email";
  color: string;
  gradient: string;
}

export interface SiteConfig {
  profile: {
    name: string;
    title: string;
    avatar: string;
    version: string;
    intro: string;
    description: string;
  };
  socials: SocialLink[];
  projects: {
    title: string;
    subtitle: string;
    icon: string;
    githubUrl: string;
    items: Project[];
  };
  technologies: {
    title: string;
    subtitle: string;
    items: Technology[];
  };
  contact: {
    items: ContactItem[];
  };
  footer: {
    text: string;
    author: string;
    sourceText: string;
    sourceUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  profile: {
    name: "Floser",
    title: "Full-Stack Developer",
    avatar: "/avatar.png",
    version: "v1.0.0",
    intro:
      "Hi 👋, I'm Ibrahim (aka. <span class='text-white font-semibold'>Floser</span>), I'm 18 years old and I'm from Azerbaijan.",
    description:
      "I specialize in <span class='text-white font-semibold underline underline-offset-2'>Javascript</span>, <span class='text-white font-semibold underline underline-offset-2'>Discord bot development</span>, and <span class='text-white font-semibold underline underline-offset-2'>web development</span> to create seamless user experiences and powerful automation tools. I also enjoy exploring the latest technologies and sharing knowledge with the community.",
  },
  socials: [
    {
      name: "Discord",
      url: "https://discord.com/users/1009413946270285854",
      icon: "discord",
    },
    {
      name: "GitHub",
      url: "https://github.com/floserdev",
      icon: "github",
    },
  ],
  projects: {
    title: "My Projects",
    subtitle: "Here are some of the projects I've worked on.",
    icon: "/folder_src.png",
    githubUrl: "https://github.com/floserdev",
    items: [
      {
        name: "gxdsoftware.com",
        description: "Gaming software platform",
        url: "https://gxdsoftware.com",
      },
      {
        name: "floser.dev",
        description: "Personal portfolio",
        url: "https://floser.dev",
      },
      {
        name: "paste.tr",
        description: "Code & text sharing platform",
        url: "https://paste.tr",
      },
      {
        name: "ccu.tr",
        description: "File uploading & sharing platform",
        url: "https://ccu.tr",
      },
      {
        name: "shakeuptime.now.sh",
        description: "Hosting platform for discord bots",
        url: "https://shakeuptime.vercel.app",
      },
      {
        name: "shakecode.now.sh",
        description: "Code sharing platform for discord bots",
        url: "https://shakecode.vercel.app",
      },
    ],
  },
  technologies: {
    title: "Technologies",
    subtitle: "Languages and frameworks I work with.",
    items: [
      { name: "Javascript", icon: "/javascript.png" },
      { name: "Node.js", icon: "/nodejs.png" },
      { name: "React", icon: "/react.png" },
      { name: "HTML", icon: "/html.png" },
      { name: "CSS", icon: "/css.png" },
      { name: "Tailwind CSS", icon: "/tailwindcss.png" },
    ],
  },
  contact: {
    items: [
      {
        name: "Instagram",
        handle: "@floserdev",
        url: "https://instagram.com/floserdev",
        icon: "instagram",
        color: "#E1306C",
        gradient: "from-pink-500 via-purple-500 to-orange-400",
      },
      {
        name: "Email",
        handle: "contact@floser.dev",
        url: "mailto:contact@floser.dev",
        icon: "email",
        color: "#3B82F6",
        gradient: "from-blue-500 to-cyan-400",
      },
    ],
  },
  footer: {
    text: "Developed and created by",
    author: "Floser",
    sourceText: "Get source",
    sourceUrl: "https://github.com/floserdev/portfolio",
  },
};
