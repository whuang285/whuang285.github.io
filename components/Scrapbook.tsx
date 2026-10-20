import type { ReactNode } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  caption?: string;
};

function ScrapbookFigure({ src, alt, caption }: PhotoProps) {
  return (
    <figure className="scrapbook-figure">
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function ScrapbookPhoto(props: PhotoProps) {
  return (
    <div className="scrapbook-photo">
      <ScrapbookFigure {...props} />
    </div>
  );
}

type PairProps = {
  left: PhotoProps;
  right: PhotoProps;
};

export function ScrapbookPair({ left, right }: PairProps) {
  return (
    <div className="scrapbook-pair">
      <ScrapbookFigure {...left} />
      <ScrapbookFigure {...right} />
    </div>
  );
}

type CollageProps = {
  images: PhotoProps[];
};

export function ScrapbookCollage({ images }: CollageProps) {
  return (
    <div className="scrapbook-collage">
      {images.map((photo, index) => (
        <ScrapbookFigure key={`${photo.src}-${index}`} {...photo} />
      ))}
    </div>
  );
}

type StoryProps = PhotoProps & {
  title?: string;
  imagePosition?: "left" | "right";
  children: ReactNode;
};

export function ScrapbookStory({
  src,
  alt,
  caption,
  title,
  imagePosition = "left",
  children,
}: StoryProps) {
  return (
    <section className={`scrapbook-story scrapbook-story--${imagePosition}`}>
      <ScrapbookFigure src={src} alt={alt} caption={caption} />

      <div className="scrapbook-story__text">
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </section>
  );
}
