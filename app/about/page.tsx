export default function About() {
  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">ABOUT</p>
        <h1>Hi, I'm Wendy.</h1>
        <p>
          I'm a software engineer eager to give you a glimpse of my journey.
          Over the past 5 years, I've immersed myself in the world of coding,
          honing my expertise in languages like Java and Python, while remaining
          at the forefront of technological advancements that propel our
          industry.
        </p>
        <p>
          As a curious problem-solver, I love turning ideas into tangible
          digital solutions.
        </p>
      </header>
      <section className="about-section two-col">
        <div>
          <h2>Education</h2>

          <h3>Cornell University</h3>

          <p>
            Bachelors of Science, Computer Science
            <br />
            2014 — 2018
          </p>
        </div>

        <div>
          <h2>Technologies</h2>

          <div className="technology-group">
            <strong>Languages</strong>
            <p>Python · Java · Kotlin · JavaScript · Go</p>
          </div>

          <div className="technology-group">
            <strong>Backend</strong>
            <p>APIs · SQL · Distributed Systems</p>
          </div>

          <div className="technology-group">
            <strong>Infrastructure</strong>
            <p>AWS · Kubernetes · Terraform</p>
          </div>
        </div>
      </section>
      <section className="about-section two-col">
        <div>
          <h2>Education</h2>
          <h3>Cornell University</h3>
          <p>
            Bachelors of Science, Computer Science
            <br />
            2014 — 2018
          </p>
        </div>
        <div>
          <h2>Technologies</h2>
          <p>
            Python · Java · Kotlin · JavaScript · HTML/CSS · SQL · Go ·
            Kubernetes · Terraform · AWS
          </p>
        </div>
      </section>
    </div>
  );
}
function Job({
  org,
  role,
  date,
  items,
}: {
  org: string;
  role: string;
  date: string;
  items: string[];
}) {
  return (
    <article className="job">
      <div className="job-head">
        <div>
          <h3>{org}</h3>
          <p>{role}</p>
        </div>
        <time>{date}</time>
      </div>
      {items.length > 0 && (
        <ul>
          {items.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
