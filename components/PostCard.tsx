import Link from "next/link";
import type { Post } from "../content/posts";

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "post-card featured" : "post-card"}>
      <div className="post-meta">
        <span>{post.category}</span>
        <span>{post.date}</span>
        <span>{post.readingTime}</span>
      </div>

      <h3>
        <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
      </h3>

      <p>{post.excerpt}</p>

      <Link href={`/blog/${post.slug}/`} className="post-card-link">
        Read article →
      </Link>
    </article>
  );
}
