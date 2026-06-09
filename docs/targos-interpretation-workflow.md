# TArgos Interpretation Workflow

This document describes the project-owned interpretation workflow for canine tumor report generation. It is implemented in `backend/samples/interpretation_workflow.py` and is designed to use `新版报告模板-TArgos`.

## Design Principles

- Routine sample information comes from LIMS, not from manual web entry.
- Clinical exams, treatment, prognosis, and follow-up are imported through backend interfaces.
- Variant results come from the bioinformatics pipeline.
- Report wording comes from the backend-maintained tumor gene interpretation library.
- The web page is used for monitoring, review, exception handling, and release.
- Report generation must not call or depend on another project template.

## Workflow Stages

| Stage | Input | Output | Release Gate |
| --- | --- | --- | --- |
| LIMS data ingest | Sample ID, dog info, panel, received date, status | Read-only sample master record | LIMS fields are complete and traceable |
| Clinical import | Diagnosis, exams, pathology, treatment, prognosis, follow-up | Clinical report summary and timeline | Imported or marked temporarily unavailable |
| QC gate | Sequencing and bioinformatics metrics | Pass/review/fail status and warning text | Pass or completed manual review |
| Variant normalization | SNV/Indel, CNV, Fusion, VAF, copy number, tier | Unified variant objects | Key fields are complete |
| Library matching | Gene, alteration, tumor type, species scope, evidence tier | Standard report text and evidence metadata | All reportable variants are matched or queued for manual interpretation |
| TArgos report composition | Template, sample, clinical, QC, variants, interpretation text | Structured report draft | Required sections are complete |
| Review and release | Draft, checklist, exception flags | Released report and LIMS callback payload | Reviewer approves |

## Interpretation Library Contract

The backend interpretation library should maintain records with:

- gene
- alteration pattern
- variant type
- tumor type or tumor category
- species applicability
- evidence tier
- clinical tags
- standard summary
- report text
- references
- version
- reviewer
- active/inactive status

Records should be editable through Django admin or batch import. Historical versions should be preserved by versioning instead of silent overwrite when the wording affects released reports.

## Report Draft Contract

The report draft payload should include:

- `template`: `新版报告模板-TArgos`, version, file path, and template text
- `interpretation_workflow`: TArgos workflow ID, name, version, stages, and release gates
- `interpretation_library`: match count and manual-review count
- `sample`: LIMS sample and dog information
- `clinical`: imported clinical summary and timeline fields
- `qc`: status and warning flag
- `variants`: grouped actionable, supportive, structural, VUS, unmatched, and all variants
- `conclusion`: generated draft conclusion
- `word_report`: editable Word draft filename, format, status, and review-editing flag
- `review_checklist`: release checklist for reviewers

## Manual Review Rules

A variant should enter `待解读` when:

- no active interpretation-library record matches the variant
- the matched record lacks report text
- the evidence tier is low or uncertain
- species applicability is unclear
- QC, tumor content, or sample identity needs review
- clinical context conflicts with the molecular finding

## Release Rules

A report can be released only when:

- LIMS sample identity is confirmed
- clinical information is imported or explicitly marked unavailable
- QC is pass or reviewed
- all reportable variants have approved interpretation text
- the conclusion and limitations have been reviewed
- the editable Word draft has been checked and finalized
- the report file can be traced by version, reviewer, and release time

## LIMS Callback Payload

After release, the backend should write back:

- sample ID
- LIMS ID
- report status
- template name and version
- interpretation workflow version
- conclusion summary
- report file ID or URL
- reviewer
- released time
