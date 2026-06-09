# Report Generation Workflow

This workflow adapts the Mercury Manager report-generation idea and the `报告生成-513` reference flow to canine tumor genomic testing.

## Overall Chain

```text
LIMS sample master data
    ↓
Wet lab and sequencing workflow
    ↓
Bioinformatics pipeline
    ↓
QC metrics + variant results
    ↓
Clinical information import
    ↓
Tumor gene interpretation library matching
    ↓
Automatic structured report draft
    ↓
Reviewer approval
    ↓
Report release
    ↓
Sync report status/result back to LIMS
```

## Data Inputs

| Input | Source | Purpose |
| --- | --- | --- |
| Sample master data | LIMS sync | Sample ID, dog info, owner/hospital, panel, received date |
| Clinical information | Backend import | Exams, pathology, treatment, prognosis, follow-up |
| QC metrics | Sequencing or bioinformatics pipeline | Decide whether the sample is reportable |
| Variant results | Bioinformatics pipeline | SNV, Indel, CNV, fusion and evidence tier |
| Tumor gene interpretation library | Canis OncoTrack knowledge base | Approved gene/variant interpretation, evidence tier, clinical relevance and report text |
| Report template | Canis OncoTrack | Product-specific report layout |

## 513-Inspired Automatic Report Logic

The report should be generated from backend synchronized data, not from report fields manually typed in the web UI.

```text
LIMS synchronized sample data
  + backend-imported clinical information
  + pipeline QC and variant results
  + tumor gene interpretation library
  + product report template
  -> report draft
  -> interpretation/reviewer queue
  -> released report
  -> LIMS callback
```

The web page is mainly responsible for monitoring, reviewing, correcting exceptional cases, and releasing reports.

## Tumor Gene Interpretation Library Matching

For each reportable variant, the generator should match the interpretation library by:

- gene symbol
- alteration or alteration pattern
- variant type
- tumor type or tumor category
- product/panel
- evidence tier
- species applicability

Matched records provide:

- standard report wording
- diagnostic/prognostic/therapy/follow-up tags
- evidence summary
- reference list
- reviewer/version metadata

If no approved interpretation record is matched, the finding should enter `待解读` rather than being silently reported.

## Product-Specific Report Logic

| Product | Report Focus |
| --- | --- |
| Canine tumor 154-gene panel | Actionable variants, diagnostic/prognostic relevance, therapy clues, follow-up suggestions |
| Canine solid tumor hotspot panel | Hotspot mutations and concise interpretation |
| WES-assisted analysis | Broader exploratory findings with stricter evidence boundary |

## Reportability Rules

A sample can enter report generation when:

- LIMS sample data exists
- clinical information has been imported or explicitly marked unavailable
- QC status is `通过`
- variant result import is complete
- all reportable variants have approved interpretation-library matches or manual interpretation review

If QC is `待复核` or `失败`, generate a warning or block final release depending on lab policy.

## Variant Section Logic

The report generator should group findings as:

1. Clinically significant or actionable variants
2. Prognostic or diagnostic supportive variants
3. VUS or low-confidence findings
4. CNV/fusion findings needing manual review

Each finding should include:

- gene
- alteration
- variant type
- VAF/copy number when available
- evidence tier
- interpretation
- whether it affects therapy, prognosis, diagnosis, or follow-up

## Clinical Section Logic

Clinical information is imported from backend sources and displayed in the report as:

- clinical diagnosis
- chief complaint
- key physical exam/imaging/pathology/lab findings
- treatment history
- prognosis and follow-up notes

## Report Status Lifecycle

```text
未生成
  -> 待解读
  -> 待审核
  -> 已发布
  -> 已同步LIMS
```

## LIMS Callback

After release, the report module should sync:

- sample ID
- report status
- release time
- report conclusion summary
- report file URL or file ID
- reviewer

back to LIMS.

## Current Scaffold

The current backend provides:

```text
POST /api/reports/generate/
POST /api/reports/{id}/release/
POST /api/reports/{id}/sync-lims/
```

The generated report is currently a structured JSON draft. A future iteration can render it to Word/PDF using a template engine.
