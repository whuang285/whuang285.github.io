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
      <section className="about-section">
        <h2>Experience</h2>
        <div className="timeline">
          <Job
            org="Amazon"
            role="Software Engineer"
            date="Current"
            items={[]}
          />
          <Job
            org="NYDIG"
            role="Senior Software Engineer"
            date="June 2021 — May 2023"
            items={[
              "Led a team to improve account onboarding experience by building out a multi-step account management application. Enabling accounts to live in both editable and published states while maintaining the data approval process.",
              "Researched, designed, and developed a new master system that connects customers to all their accounts. Constructed and advocated for a single source of truth and ease of access to customer information.",
              "Migrated data pipeline and infrastructure of existing applications to new systems using terraform and Github workflows, significantly reducing infrastructure cost.",
            ]}
          />
          <Job
            org="Capital One"
            role="Software Engineer"
            date="July 2020 — May 2021"
            items={[
              "Created Kubernetes custom resources and endpoints to improve functionality for Capital One’s first open source project, Critical Stack, a Kubernetes container orchestration platform made with strict enterprise environments in mind.",
              "Implemented an application marketplace for Critical Stack that allows premade Kubernetes resources to be accessed and downloaded onto clusters.",
            ]}
          />
          <Job
            org="Capital One"
            role="Associate Software Engineer"
            date="September 2019 — July 2020"
            items={[
              "Built APIs and back-end logic for acquisition and processing of card applications, moving application off legacy systems into cloud.",
              "Developed back-end for real-time document upload project allowing customers to access personalized page to upload necessary documents, eliminating physical mail and saving time/resources.",
            ]}
          />
          <Job
            org="Johnson & Johnson"
            role="Software Engineering Co-op"
            date="May 2017 — August 2017"
            items={[
              "Constructed framework, integrated database, and built dashboard for a post surgery project as tech lead.",
              "Implemented front-end D3 visualization layer for a 4-sprint project to display connection of two disparate data sources and allow surgeons to interact with results of single analytics store.",
            ]}
          />
          <Job
            org="Johnson & Johnson"
            role="Software Engineering Co-op"
            date="August 2016 — December 2016"
            items={[
              "Completed 10 sprints and 2 internal releases to help deliver a $6MM medication adherence project under tight deadlines. Focused mainly on web portal using Angular2 and Symfony.",
            ]}
          />
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
