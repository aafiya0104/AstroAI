// Human-readable labels for the 30 features returned by the backend's
// /predict endpoint (models/reasoning.py FEATURE_NAMES, same order).
// value: 1 = looks safe, 0 = neutral/inconclusive, -1 = suspicious.
export const FEATURE_LABELS: Record<string, string> = {
  UsingIP: "IP Address Usage",
  LongURL: "URL Length",
  ShortURL: "URL Shortener",
  "Symbol@": "'@' Symbol in URL",
  "Redirecting//": "Redirect Pattern",
  "PrefixSuffix-": "Hyphen in Domain",
  SubDomains: "Subdomain Count",
  HTTPS: "HTTPS Presence",
  DomainRegLen: "Domain Registration Length",
  Favicon: "Favicon Source",
  NonStdPort: "Non-Standard Port",
  HTTPSDomainURL: "'https' in Domain Name",
  RequestURL: "External Media Requests",
  AnchorURL: "External Link Ratio",
  LinksInScriptTags: "External Script/Style Links",
  ServerFormHandler: "Form Submission Target",
  InfoEmail: "Mailto Links",
  AbnormalURL: "URL/Domain Consistency",
  WebsiteForwarding: "Number of Redirects",
  StatusBarCust: "Status Bar Manipulation",
  DisableRightClick: "Right-Click Disabled",
  UsingPopupWindow: "Popup Windows",
  IframeRedirection: "Hidden Iframes",
  AgeofDomain: "Domain Age",
  DNSRecording: "DNS History",
  WebsiteTraffic: "Website Traffic",
  PageRank: "Page Rank",
  GoogleIndex: "Google Index Status",
  LinksPointingToPage: "Inbound Links",
  StatsReport: "Known Threat Infrastructure Match",
};

export function featureVerdictLabel(value: number): "Safe" | "Neutral" | "Suspicious" {
  if (value > 0) return "Safe";
  if (value < 0) return "Suspicious";
  return "Neutral";
}
