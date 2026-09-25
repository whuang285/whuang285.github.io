import { notFound } from "next/navigation";
import Link from "next/link";
import GithubSlugger from "github-slugger";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getPost, posts } from "../../../content/posts";

import FeatureImage from "../../../components/FeatureImage";
import SplitSection from "../../../components/SplitSection";
import InfoCard from "../../../components/InfoCard";
import TravelTip from "../../../components/TravelTip";

function createHeadingComponents() {
  const slugger = new GithubSlugger();

  return {
    h2: ({ children }: { children: React.ReactNode }) => {
      const text = getTextFromChildren(children);
      const id = slugger.slug(text);

      return <h2 id={id}>{children}</h2>;
    },

    h3: ({ children }: { children: React.ReactNode }) => {
      const text = getTextFromChildren(children);
      const id = slugger.slug(text);

      return <h3 id={id}>{children}</h3>;
    },
  };
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => getTextFromChildren(child)).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    const element = children as React.ReactElement<{
      children?: React.ReactNode;
    }>;

    return getTextFromChildren(element.props.children);
  }

  return "";
}

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

  const headingComponents = createHeadingComponents();

  const components = {
    FeatureImage,
    SplitSection,
    InfoCard,
    TravelTip,
    ...headingComponents,
  };

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

        {post.subtitle && <p className="article-subtitle">{post.subtitle}</p>}
      </header>

      <div className="article-layout">
        {post.headings.filter((heading) => heading.level <= 2).length > 0 && (
          <aside className="toc">
            <div className="toc-title">On this page</div>

            {post.headings
              .filter((heading) => heading.level <= 2)
              .map((heading) => (
                <a key={heading.id} href={`#${heading.id}`}>
                  {heading.text}
                </a>
              ))}
          </aside>
        )}

        <div className="article-body">
          <MDXRemote source={post.content} components={components} />
        </div>
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
