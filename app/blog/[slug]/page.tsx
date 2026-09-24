import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, posts } from "../../../content/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const index = posts.findIndex((item) => item.slug === post.slug);

  const previous = posts[index + 1];
  const next = posts[index - 1];

  return (
    <article className="article">
      <header className="article-head">
        <Link href="/blog/" className="back">
          ← All writing
        </Link>

        <div className="post-meta">
          <span>{post.category}</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>{post.readingTime}</span>
        </div>

        <h1>{post.title}</h1>

        <p>{post.excerpt}</p>
      </header>

      {post.image && (
        <figure className="article-hero">
          <img src={post.image} alt="" />
        </figure>
      )}

      <div className="article-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <nav className="article-nav">
        {previous ? (
          <Link href={`/blog/${previous.slug}/`}>
            <span>← Previous</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={`/blog/${next.slug}/`} className="next">
            <span>Next →</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
