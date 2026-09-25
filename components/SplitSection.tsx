import type { ReactNode } from "react";

type SplitSectionProps = {
  children: ReactNode;
  image: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  caption?: string;
};

export default function SplitSection({
  children,
  image,
  imageAlt = "",
  imagePosition = "right",
  caption,
}: SplitSectionProps) {
  return (
    <section className={`split-section split-section--${imagePosition}`}>
      <div className="split-section__text">{children}</div>

      <figure className="split-section__image">
        <img src={image} alt={imageAlt} />

        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </section>
  );
}
