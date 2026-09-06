import Image from "next/image";

interface PageHeroProps {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export function PageHero({ src, alt = "", title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative h-[280px] w-full overflow-hidden md:h-[360px]"
      aria-label={title ? `${title} hero` : "Page hero"}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />
      {(title || subtitle) && (
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-10 md:px-16">
          {title && (
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
