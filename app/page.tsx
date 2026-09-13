type HubTag = {
  label: string;
  href: string;
};

type HubItem = {
  index: string;
  meta: string;
  title: string;
  description: string;
  href: string;
  tags?: HubTag[];
};

const explorations: HubItem[] = [
  {
    index: "01",
    meta: "Prototype · Checking + Debit",
    title: "Square Checking",
    description:
      "Welcome / Apple Wallet, card tracker, Banking home, Deposit / Transfer / card numbers",
    href: "https://cursor.com/codebase/d-shawn/tmp-ff49778e73eaf31e",
    tags: [
      {
        label: "Figma",
        href: "https://www.figma.com/design/mcg2qzVEuKNsFeVPGe7F5U/Square-Checking-SPOS-for-Grok",
      },
    ],
  },
  {
    index: "02",
    meta: "Prototype · Banking",
    title: "Banking Overview",
    description:
      "Branch 3 Seller Banking overview / Decisions rail that Cash Desk evolves from",
    href: "https://square-money-branch-3.vercel.app/banking",
  },
  {
    index: "03",
    meta: "Prototype · Agentic",
    title: "AI Vision (Cash Desk)",
    description:
      "Available hero, Approvals with evidence, propose → confirm; Square seller DS #101010 / #005AD9",
    href: "https://github.com/dianashawnbarraza-wq/square-money-cash-desk/pull/1",
    tags: [
      {
        label: "Figma",
        href: "https://www.figma.com/design/OsWnpib1fPOE1wcuNtDXGd",
      },
    ],
  },
];

const references: HubItem[] = [
  {
    index: "01",
    meta: "Reference · Spend",
    title: "Ramp",
    description: "Spend approvals / control; job packages not chat theater",
    href: "https://ramp.com",
  },
  {
    index: "02",
    meta: "Reference · Bill pay",
    title: "Melio",
    description: "Bill pay confirm / evidence before money moves",
    href: "https://www.melio.com",
  },
  {
    index: "03",
    meta: "Reference · Banking",
    title: "Mercury",
    description: "Calm SMB banking chrome + automation tone",
    href: "https://mercury.com",
  },
  {
    index: "04",
    meta: "Reference · Cards",
    title: "Brex",
    description: "Cards + AI insights for business spend",
    href: "https://www.brex.com",
  },
  {
    index: "05",
    meta: "Reference · Assist",
    title: "Intuit Assist / QuickBooks",
    description: "Ambient finance assist / forecast reference",
    href: "https://quickbooks.intuit.com",
  },
];

function HubList({ items }: { items: HubItem[] }) {
  return (
    <ol className="uq-list">
      {items.map((item) => (
        <li key={item.index + item.title} className="uq-list-item">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="uq-link"
          >
            <article className="uq-item">
              <span className="uq-item-index">{item.index}</span>
              <div className="uq-item-body">
                <p className="uq-item-meta">{item.meta}</p>
                <h2 className="uq-item-title">{item.title}</h2>
                <p className="uq-item-desc">{item.description}</p>
              </div>
              <span className="uq-item-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          </a>
          {item.tags && item.tags.length > 0 ? (
            <div className="uq-revision-tags">
              <ul className="uq-tag-row">
                {item.tags.map((tag) => (
                  <li key={tag.href} className="uq-tag-item">
                    <a
                      href={tag.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uq-tag"
                    >
                      {tag.label}
                      <span className="uq-tag-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function HomePage() {
  return (
    <main className="uq-landing">
      <div className="uq-landing-inner">
        <header className="uq-landing-header">
          <span className="uq-eyebrow">Square Money Design Sandbox</span>
          <span className="uq-eyebrow uq-eyebrow--muted">Workstream</span>
        </header>

        <section className="uq-hero">
          <h1 className="uq-display">Square Money</h1>
          <p className="uq-lede">
            Gusto story arc: Checking and debit adoption, then Banking overview,
            then agentic Cash Desk — prototypes and references in one place.
          </p>
        </section>

        <section className="uq-explorations" aria-labelledby="explorations-heading">
          <header className="uq-section-head">
            <span id="explorations-heading" className="uq-eyebrow">
              Explorations
            </span>
            <span className="uq-count">03</span>
          </header>
          <HubList items={explorations} />
        </section>

        <section className="uq-explorations" aria-labelledby="references-heading">
          <header className="uq-section-head">
            <span id="references-heading" className="uq-eyebrow">
              References
            </span>
            <span className="uq-count">05</span>
          </header>
          <HubList items={references} />
        </section>
      </div>
    </main>
  );
}
