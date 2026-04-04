# CLAUDE.md — Agent Architecture & SEO SOP

## 1. Governance: The CEO Protocol
- **Claude's Role:** CEO / Strategic Analyzer. Do not perform "grunt work" that Bash/Ollama can do.
- **Workflow Hierarchy:** 
  1. **BASH (Sayeret):** Mapping routes, Grep for patterns (0 tokens).
  2. **Ollama (Filter):** Local Llama 3.2 for metadata extraction and summarization (Local 🔒).
  3. **Gemini Worker (Examiner):** Large context analysis and SEO audits via `scripts/gemini-worker.mjs`.
  4. **Claude (CEO):** Final strategic decisions and refined Hebrew copywriting.

## 2. SEO Configuration (Moran Paz / BeinMe)
- **Live Domain:** https://www.moranpaz.co.il (Update once live).
- **Primary Keywords:** פסיכותרפיה הוליסטית, טיפול רגשי טבעון, עבודה עם גוף נפש רוח.
- **Tools:** Use `node scripts/gemini-worker.mjs` for heavy lifting.

## 3. SEO Execution Rules (The Golden Rules)
- **Zero Waste:** Never use Claude tokens for what Bash/Grep can find for free.
- **Metadata Limits:** Title < 60ch (✅), Description < 160ch (✅).
- **Schema Strategy:** Always check for `MedicalBusiness` or `Psychotherapist` in therapy pages.
- **Pre-Commit Checks:** Run the Python/Bash scripts from the SOP to verify H1 count and Title length.

## 4. Playbooks to Follow
- **Playbook A (Audit):** Bash (Find routes) -> Python (Extract meta) -> Gemini (Audit report) -> Claude (Strategy).
- **Playbook D (Schema):** Implement `VideoObject` and `FAQPage` schemas as defined in the SOP.
