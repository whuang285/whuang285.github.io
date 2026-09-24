import { PostRow } from "../../components/PostRow";
import { posts } from "../../content/posts";

function groupPostsByYear() {
  return posts.reduce<Record<string, typeof posts>>((groups, post) => {
    const year = new Date(post.date).getFullYear().toString();

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(post);

    return groups;
  }, {});
}

export default function Blog() {
  const groups = groupPostsByYear();

  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">WRITING</p>

        <h1>Notes on engineering, technology, travel & life.</h1>

        <p>
          A collection of things I've learned, places I've been, and ideas I've
          wanted to remember.
        </p>
      </header>

      <div className="archive">
        {Object.entries(groups).map(([year, yearPosts]) => (
          <section className="archive-year" key={year}>
            <h2>{year}</h2>

            <div className="archive-posts">
              {yearPosts.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
