export function SiteFooter() {
  return (
    <footer className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
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
