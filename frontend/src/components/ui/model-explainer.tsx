const SECTIONS = [
  {
    title: "Dataset",
    body: "The model is trained on real, live-extracted URLs: legitimate domains sampled from the Tranco top-1M list plus a curated set of well-known sites, and phishing URLs pulled from the OpenPhish and PhishStats feeds. Every URL's 30 features are computed the same way at training time and at scan time, so no pre-featurized or synthetic data is used and the model sees the same signals in production that it learned from.",
  },
  {
    title: "Model",
    body: "ASTRO uses a Gradient Boosting Classifier trained with cross-validated hyperparameter tuning to avoid overfitting. Before scoring, every URL passes through a threat-intelligence layer, including Google Safe Browsing, OpenPhish, URLhaus, and RDAP domain-age lookups, which can short-circuit obviously malicious or long-established, trusted domains before the ML model even runs. When the model does run, its probability output becomes the confidence score, and a Groq-hosted language model turns the specific signals that fired into a plain-English explanation. It only summarizes evidence that was actually detected, so the explanation can never contradict the verdict.",
  },
  {
    title: "Detection Pipeline",
    body: "Every scan runs through the full pipeline in real time: live feature extraction from the URL and page structure, a threat-intelligence check against known blocklists and domain age, the trained classifier's probability score, and finally the AI reasoning step that explains the result. Each stage is checked against real websites during development, not just held-out test data, so edge cases like long-established sites with unusual page structures are caught and corrected before they reach production.",
  },
];

const THREAT_DATABASES = [
  {
    name: "Google Safe Browsing",
    description:
      "Google's threat intelligence API scanning billions of URLs daily. The most authoritative real-time phishing and malware detection service available.",
  },
  {
    name: "OpenPhish",
    description:
      "Community-driven phishing URL feed updated every 12 hours. Free, no API key required, cached locally so checks are instant.",
  },
  {
    name: "Abuse.ch URLhaus",
    description:
      "Community-driven DNS blocklist tracking malware distribution domains. Combined with RDAP domain age analysis to catch newly registered phishing domains.",
  },
  {
    name: "RDAP Domain Age",
    description:
      "Queries IANA RDAP to find when a domain was registered. Domains under 30 days old are flagged high risk, since newly registered domains are the #1 phishing indicator.",
  },
];

export default function ModelExplainer() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
      {SECTIONS.map((section, i) => (
        <section key={section.title} className={i === 0 ? "" : "mt-16"}>
          <h2
            className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-4xl"
            style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
          >
            {section.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
            {section.body}
          </p>
        </section>
      ))}

      <section className="mt-16">
        <h2
          className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-4xl"
          style={{ fontFamily: 'var(--font-blockrub, "Blockrub"), sans-serif' }}
        >
          Threat Intelligence Databases
        </h2>
        <p
          className="mt-3 max-w-2xl text-sm italic text-white md:text-base"
          style={{ fontFamily: 'var(--font-playfair, "Playfair Display"), serif' }}
        >
          Checked before the ML model even runs. A hit here short-circuits straight to a
          phishing verdict.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {THREAT_DATABASES.map((db) => (
            <div
              key={db.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
                <h3 className="text-base font-bold text-white">{db.name}</h3>
                <span
                  className="ml-auto text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Clean
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white">{db.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
