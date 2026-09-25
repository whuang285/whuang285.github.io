type FeatureImageProps = {
  src: string;
  alt?: string;
  caption?: string;
};

export default function FeatureImage({
  src,
  alt = "",
  caption,
}: FeatureImageProps) {
  return (
    <figure className="feature-image">
      <img src={src} alt={alt} />

      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
