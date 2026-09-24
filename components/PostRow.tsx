import Link from "next/link";
import type { Post } from "../content/posts";

export function PostRow({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}/`} className="post-row">
      <div className="post-row-date">
        {new Date(post.date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </div>

      <div className="post-row-main">
        <div className="post-row-meta">{post.category}</div>

        <h3>{post.title}</h3>

        <p>{post.excerpt}</p>
      </div>

      <div className="post-row-arrow">→</div>
    </Link>
  );
}
