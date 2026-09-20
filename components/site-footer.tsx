import Link from "next/link";
import { navigationItems } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="hidden justify-end lg:flex">
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-7">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-espresso uppercase transition-colors hover:text-brand-sand"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center lg:mt-10 lg:border-t lg:border-brand-oyster/70 lg:pt-5">
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-brand-sand uppercase">
            Clifton · Cape Town
          </p>

          <p className="text-[0.58rem] font-medium tracking-[0.1em] text-brand-espresso/55 uppercase sm:justify-self-center">
            Designed and developed by{" "}
            <a
              href="https://www.stackswift.co/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-sand transition-colors hover:text-brand-umber"
            >
              StackSwift
            </a>
          </p>

          <p className="text-[0.62rem] tracking-[0.12em] text-brand-umber/70 uppercase sm:justify-self-end">
            © {new Date().getFullYear()} Bungalow 69 Clifton
          </p>
        </div>
      </div>
    </footer>
  );
}
