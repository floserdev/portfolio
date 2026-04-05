import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="max-w-[50rem] w-full mx-auto py-8 shrink-0 px-6 md:px-0 fade-in delay-7">
      <div className="flex items-center justify-between pt-8">
        <p className="text-xs text-gray-500">
          {siteConfig.footer.text}{" "}
          <span className="text-gray-400 font-bold">
            {siteConfig.footer.author}
          </span>
        </p>
        <a
          href={siteConfig.footer.sourceUrl}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {siteConfig.footer.sourceText}
        </a>
      </div>
    </footer>
  );
}
