type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  number: string;
};

export function PageIntro({ eyebrow, title, description, number }: PageIntroProps) {
  return (
    <main className="bg-white">
      <section className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1440px] flex-col justify-between px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="flex items-center justify-between border-b border-brand-oyster pb-5">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] text-brand-sand uppercase">{eyebrow}</p>
          <span className="font-display text-xl text-brand-umber/60" aria-hidden="true">
            {number}
          </span>
        </div>

        <div className="grid gap-8 py-20 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:items-end lg:gap-20">
          <h1 className="max-w-5xl font-display text-[clamp(4rem,10vw,9rem)] leading-[0.82] font-medium tracking-[-0.055em] text-brand-espresso">
            {title}
          </h1>
          <p className="max-w-xl border-l border-brand-sand pl-6 text-base leading-8 text-brand-espresso/75 sm:text-lg">
            {description}
          </p>
        </div>

        <p className="border-t border-brand-oyster pt-5 text-[0.62rem] font-semibold tracking-[0.2em] text-brand-umber uppercase">
          Bungalow 69 · Clifton Fourth Beach
        </p>
      </section>
    </main>
  );
}
