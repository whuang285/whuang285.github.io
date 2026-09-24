import Image from 'next/image';

const experience = [
  {
    company: 'NYDIG',
    roles: [
      {
        title: 'Senior Software Engineer',
        dates: 'June 2021 — May 2023',
        bullets: [
          'Led a team to improve account onboarding experience by building out a multi-step account management application. Enabling accounts to live in both editable and published states while maintaining the data approval process.',
          'Researched, designed, and developed a new master system that connects customers to all their accounts. Constructed and advocated for a single source of truth and ease of access to customer information.',
          'Migrated data pipeline and infrastructure of existing applications to new systems using terraform and Github workflows, significantly reducing infrastructure cost.',
        ],
      },
    ],
  },
  {
    company: 'Capital One',
    roles: [
      {
        title: 'Software Engineer',
        dates: 'July 2020 — May 2021',
        bullets: [
          'Created Kubernetes custom resources and endpoints to improve functionality for Capital One’s first open source project, Critical Stack, a Kubernetes container orchestration platform made with strict enterprise environments in mind.',
          'Implemented an application marketplace for Critical Stack that allows premade Kubernetes resources to be accessed and downloaded onto clusters.',
        ],
      },
      {
        title: 'Associate Software Engineer',
        dates: 'September 2019 — July 2020',
        bullets: [],
      },
      {
        title: 'Associate Software Engineer',
        dates: 'July 2018 — September 2019',
        bullets: [
          'Built APIs and back-end logic for the acquisition and processing of card applications, moving the application off legacy systems and into the cloud.',
          'Developed the back-end for a real-time document upload project that allows for customers to access their personalized page to upload all their necessary documents. Eliminated the need for customers to physically mail in their documents, saving time and resources for both the company and the clients.',
        ],
      },
    ],
  },
  {
    company: 'Johnson & Johnson',
    roles: [
      {
        title: 'Software Engineering Co-op',
        dates: 'May 2017 — August 2017',
        bullets: [
          'Constructed the framework, integrated the database, and built the dashboard for a post surgery project as the tech lead.',
          'Implemented a front-end D3 visualization layer for a 4-sprint project to display the connection of two disparate data sources to allow surgeons to interact with the results of a single analytics store and visually explore the output.',
        ],
      },
      {
        title: 'Software Engineering Co-op',
        dates: 'August 2016 — December 2016',
        bullets: [
          'Completed 10 sprints and worked through 2 internal releases to help deliver a $6MM project that addresses medication adherence under tight deadlines. Focused mainly on creating a web portal using the Angular2 framework and Symfony.',
        ],
      },
    ],
  },
];

const leadership = [
  {
    title: 'TDP Intern Site Lead',
    role: 'Richmond Lead',
    dates: 'February 2019 — August 2019',
    bullets: [
      'Planned activities for the internship program, including networking events, lunch and learns, and presentations.',
      'Organized and led weekly sessions for intern mentors and actively mentored interns.',
    ],
  },
  {
    title: 'Card and Small Business TDP Committee',
    role: 'Logistics Lead',
    dates: 'August 2018 — July 2019',
    bullets: [
      'Organized events such as Hackathons and Lunch & Learns for the Technology Development Program.',
      'Engaged in creating the website for Card and Small Business TDPs.',
    ],
  },
];

const skills = [
  { name: 'Python', level: 5 },
  { name: 'Java', level: 5 },
  { name: 'Kotlin', level: 5 },
  { name: 'Javascript', level: 4 },
  { name: 'HTML/CSS', level: 4 },
  { name: 'SQL', level: 4 },
  { name: 'GoLang', level: 3 },
  { name: 'Kubernetes', level: 3 },
];

function Skill({ name, level }: { name: string; level: number }) {
  return (
    <div className="skill-detail">
      <div className="skill-detail-name">{name}</div>
      <div className="skill-rating" aria-label={`${level} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < level ? 'filled' : ''}>●</span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">About</div>
          <h1>Wendy Huang</h1>
          <p>Software Engineer</p>
        </div>
      </section>

      <section className="section about-profile">
        <div className="container">
          <div className="about-profile-grid">
            <div className="about-photo-wrap">
              <Image
                src="/assets/img/profile.jpg"
                alt="Wendy Huang"
                width={420}
                height={420}
                className="about-photo"
                priority
              />
            </div>
            <div className="about-copy">
              <div className="section-label">About Me</div>
              <p className="about-lede">
                Hey there! I&apos;m Wendy, a software engineer eager to give you a glimpse of my journey. Over the past 8 years, I&apos;ve immersed myself in the world of coding, honing my expertise in languages like Java and Python, while remaining at the forefront of technological advancements that propel our industry. As a curious problem-solver, I love turning ideas into tangible digital solutions. Let&apos;s connect and explore the boundless possibilities of the digital realm together!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container about-section-grid">
          <div className="about-section-label">Education</div>
          <div className="about-detail">
            <h2>Cornell University</h2>
            <p className="detail-strong">Bachelors of Science, Computer Science</p>
            <p className="detail-muted">2014 — 2018</p>
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container about-section-grid">
          <div className="about-section-label">Experience</div>
          <div className="about-detail">
            {experience.map((company) => (
              <div className="resume-company" key={company.company}>
                <h2>{company.company}</h2>
                {company.roles.map((role, index) => (
                  <div className="resume-role" key={`${company.company}-${role.title}-${role.dates}`}>
                    <div className="resume-role-heading">
                      <div>
                        <h3>{role.title}</h3>
                        {role.bullets.length === 0 && index === 1 && <span className="role-spacer" />}
                      </div>
                      <div className="detail-muted">{role.dates}</div>
                    </div>
                    {role.bullets.length > 0 && (
                      <ul>
                        {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container about-section-grid">
          <div className="about-section-label">Leadership Activities</div>
          <div className="about-detail">
            {leadership.map((item) => (
              <div className="leadership-item" key={item.title}>
                <div className="resume-role-heading">
                  <div>
                    <h2>{item.title}</h2>
                    <h3>{item.role}</h3>
                  </div>
                  <div className="detail-muted">{item.dates}</div>
                </div>
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section skills-section">
        <div className="container about-section-grid">
          <div className="about-section-label">Technical Skills</div>
          <div className="skills-detail-grid">
            {skills.map((skill) => <Skill key={skill.name} {...skill} />)}
          </div>
        </div>
      </section>
    </>
  );
}
