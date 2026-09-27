import Image from "next/image";
import styles from "./coming-soon.module.css";

const firstColumn = [
  { src: "/images/bungalow-69-pool-ocean.webp", alt: "Bungalow 69 pool overlooking the Atlantic Ocean" },
  { src: "/images/gallery/174.webp", alt: "Ocean-facing interior at Bungalow 69" },
  { src: "/images/villa-ocean-terrace.webp", alt: "Private ocean terrace at Bungalow 69" },
];

const secondColumn = [
  { src: "/images/clifton-fourth-beach-hero.webp", alt: "Clifton Fourth Beach in Cape Town" },
  { src: "/images/gallery/158.webp", alt: "Bungalow 69 villa interior" },
  { src: "/images/villa-sea-view-bedroom.webp", alt: "Sea-view bedroom at Bungalow 69" },
];

function ImageColumn({
  images,
  reverse = false,
}: {
  images: typeof firstColumn;
  reverse?: boolean;
}) {
  const repeatedImages = [...images, ...images];

  return (
    <div className={`${styles.column} ${reverse ? styles.reverse : ""}`} aria-hidden="true">
      <div className={styles.track}>
        {repeatedImages.map((image, index) => (
          <div className={styles.frame} key={`${image.src}-${index}`}>
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(max-width: 767px) 55vw, 28vw"
              className={styles.image}
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComingSoon() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="coming-soon-title">
        <Image
          src="/images/bungalow-69-logo.svg"
          alt="Bungalow 69 Clifton"
          width={260}
          height={140}
          className={styles.logo}
          priority
        />
        <span
          className={styles.logoShimmer}
          role="img"
          aria-label="Bungalow 69 Clifton"
        />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Clifton Fourth Beach · Cape Town</p>
          <h1 id="coming-soon-title" className="hero-title-shimmer">
            Coming soon.
          </h1>
          <p className={styles.description}>
            Short-term stays at Bungalow 69, a private beachside villa in Clifton.
          </p>
        </div>
      </section>

      <section className={styles.gallery} aria-label="A preview of Bungalow 69">
        <ImageColumn images={firstColumn} />
        <ImageColumn images={secondColumn} reverse />
        <div className={styles.shade} />
      </section>
    </main>
  );
}
