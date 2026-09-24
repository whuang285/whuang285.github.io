import Link from "next/link";
import { PostCard } from "../components/PostCard";
import { posts } from "../content/posts";

export default function Home() {
  const featured = posts.find((post) => post.featured) ?? posts[0];

  return (
    <>
      <section className="hero">
        <p className="eyebrow">SOFTWARE ENGINEER · NEW YORK</p>

        <h1>
          I build software, solve messy problems, and make complicated things
          feel simpler.
        </h1>

        <p className="hero-copy">
          I'm Wendy — a software engineer interested in backend systems,
          infrastructure, and building things that make people's lives a little
          easier.
        </p>

        <div className="hero-links">
          <Link className="button" href="/about/">
            About me
          </Link>

          <Link className="text-link" href="/blog/">
            Read the writing →
          </Link>
        </div>
      </section>

      <section className="home-grid">
        <div>
          <p className="section-label">SELECTED WRITING</p>

          {featured && <PostCard post={featured} featured />}
        </div>

        <aside className="home-aside">
          <p className="section-label">CURRENTLY</p>

          <p>Software Engineer at Amazon, based in New York.</p>

          <p>Previously NYDIG, Capital One, and Johnson & Johnson.</p>

          <Link href="/about/">More about me →</Link>
        </aside>
      </section>

      <section className="experience">
        <div>
          <p className="section-label">EXPERIENCE</p>
        </div>

        <div className="experience-list">
          <div>
            <b>Amazon</b>
            <span>Software Engineer</span>
          </div>

          <div>
            <b>NYDIG</b>
            <span>Senior Software Engineer · 2021–2023</span>
          </div>

          <div>
            <b>Capital One</b>
            <span>Software Engineer · 2018–2021</span>
          </div>

          <div>
            <b>Johnson & Johnson</b>
            <span>Software Engineering Co-op</span>
          </div>
        </div>
      </section>
    </>
  );
}
