"""
Turns the raw feature vector + threat-intel result into a short, grounded
explanation via Groq. The LLM is only asked to summarize signals we already
computed (never to re-judge the URL itself), so it can't hallucinate a
verdict that disagrees with the model.
"""
import os

from groq import Groq

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "").strip()
GROQ_MODEL = "llama-3.3-70b-versatile"

FEATURE_NAMES = [
    "UsingIP", "LongURL", "ShortURL", "Symbol@", "Redirecting//", "PrefixSuffix-",
    "SubDomains", "HTTPS", "DomainRegLen", "Favicon", "NonStdPort", "HTTPSDomainURL",
    "RequestURL", "AnchorURL", "LinksInScriptTags", "ServerFormHandler", "InfoEmail",
    "AbnormalURL", "WebsiteForwarding", "StatusBarCust", "DisableRightClick",
    "UsingPopupWindow", "IframeRedirection", "AgeofDomain", "DNSRecording",
    "WebsiteTraffic", "PageRank", "GoogleIndex", "LinksPointingToPage", "StatsReport",
]

# Human-readable description of what a -1 (suspicious) reading means for each feature.
SUSPICIOUS_DESCRIPTIONS = {
    "UsingIP": "the URL uses a raw IP address instead of a domain name",
    "LongURL": "the URL is unusually long, a common tactic to hide the real destination",
    "ShortURL": "the URL uses a known link-shortening service, which can mask the real destination",
    "Symbol@": "the URL contains an '@' symbol, which browsers ignore everything before when resolving the address",
    "Redirecting//": "the URL redirects via a '//' placed deep in the path, often used to disguise the true destination",
    "PrefixSuffix-": "the domain contains a hyphen, often used to imitate a real brand (e.g. paypal-secure.com)",
    "SubDomains": "the URL has an unusually high number of subdomains",
    "HTTPS": "the site does not use HTTPS, so traffic isn't encrypted",
    "DomainRegLen": "the domain's registration period is short, which is atypical for established businesses",
    "Favicon": "the site's favicon is loaded from an external domain, inconsistent with the site being visited",
    "NonStdPort": "the URL specifies a non-standard port, unusual for legitimate websites",
    "HTTPSDomainURL": "the word 'https' appears misleadingly within the domain name itself",
    "RequestURL": "a large share of the page's images/media are loaded from external domains",
    "AnchorURL": "a large share of the page's links point to different, external domains",
    "LinksInScriptTags": "a large share of the page's scripts/stylesheets are loaded from external domains",
    "ServerFormHandler": "the page's form submits data to a blank or external destination",
    "InfoEmail": "the page contains a 'mailto:' link, sometimes used in credential-harvesting pages",
    "AbnormalURL": "the URL structure doesn't match the site's actual domain",
    "WebsiteForwarding": "the site redirects through multiple hops before reaching a final page",
    "StatusBarCust": "the page uses JavaScript to alter the browser status bar, a known deception technique",
    "DisableRightClick": "the page disables right-click, often used to block users from inspecting the page",
    "UsingPopupWindow": "the page opens popup windows, a technique used in some scam pages",
    "IframeRedirection": "the page uses invisible iframes, which can be used to hide malicious content",
    "AgeofDomain": "the domain was registered very recently",
    "DNSRecording": "the domain has little to no DNS history",
    "GoogleIndex": "the page does not appear to be indexed by Google, unusual for a legitimate site",
    "LinksPointingToPage": "very few other pages link to this URL",
    "StatsReport": "the URL or its hosting IP matches known patterns associated with phishing infrastructure",
}


def _client():
    if not GROQ_API_KEY:
        return None
    return Groq(api_key=GROQ_API_KEY)


def explain(url, verdict, safe_score, features, intel):
    """
    verdict: "safe" | "phishing"
    safe_score: float 0-1
    features: list of 30 ints (-1/0/1), in FEATURE_NAMES order
    intel: dict from threat_intel.evaluate()
    """
    client = _client()
    if client is None:
        return "AI reasoning is unavailable (missing GROQ_API_KEY)."

    flagged = [
        SUSPICIOUS_DESCRIPTIONS[name]
        for name, value in zip(FEATURE_NAMES, features)
        if value == -1 and name in SUSPICIOUS_DESCRIPTIONS
    ]

    evidence_lines = []
    if intel.get("reasons"):
        evidence_lines.append("Threat intelligence: " + "; ".join(intel["reasons"]))
    if intel.get("domain_age_days") is not None:
        evidence_lines.append(f"Domain age: {intel['domain_age_days']} days")
    if flagged:
        evidence_lines.append("Suspicious signals detected:\n- " + "\n- ".join(flagged))
    elif verdict == "safe":
        evidence_lines.append("No suspicious signals were detected in the URL or page structure.")

    evidence = "\n".join(evidence_lines) if evidence_lines else "No specific signals available."

    prompt = f"""You are explaining a phishing-detection result to a non-technical user.

URL checked: {url}
Verdict: {verdict} ({safe_score * 100:.1f}% safe)

Evidence collected by the detection system:
{evidence}

Write a short (2-4 sentence) plain-English explanation of why this URL received this verdict,
based ONLY on the evidence above. Do not invent additional reasons. Do not contradict the verdict."""

    try:
        completion = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=200,
        )
        return completion.choices[0].message.content.strip()
    except Exception as e:
        return f"AI reasoning unavailable: {e}"
