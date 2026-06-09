# Report Generation 513 Reference

This note records the target report-generation direction inspired by the existing `报告生成-513` workflow.

## Product Principle

Routine tumor report data should not be typed into the web page. The report generator should consume synchronized backend data and produce an auditable report draft.

```text
LIMS synchronized data
  + clinical import
  + sequencing QC
  + bioinformatics variant results
  + tumor gene interpretation library
  + product report template
  -> structured report draft
  -> reviewer approval
  -> released Word/PDF report
  -> report status/result callback to LIMS
```

## Authoritative Data Sources

| Data group | Source of truth | Report usage |
| --- | --- | --- |
| Sample ID, LIMS ID, patient/dog metadata, owner/hospital, product | LIMS | Report header and traceability |
| Specimen type, tumor type, anatomical site, received date | LIMS | Basic information and report context |
| Clinical diagnosis, exams, pathology, treatment, prognosis, follow-up | LIMS, HIS/EMR, or backend clinical import | Clinical background section |
| QC metrics and workflow status | Sequencing/bioinformatics pipeline | Reportability and quality statement |
| SNV, Indel, CNV, fusion, VAF, copy number | Bioinformatics pipeline | Molecular findings section |
| Gene/variant interpretation | Tumor gene interpretation library | Interpretation text, clinical relevance, evidence boundary |
| Report template and product rules | Canis OncoTrack | Output layout and product-specific wording |

## Tumor Gene Interpretation Library

The interpretation library should be a maintained knowledge base, not free text inside each report.

Recommended matching keys:

- gene
- variant or alteration pattern
- variant type
- tumor type or tumor category
- species applicability
- evidence tier
- therapy, diagnosis, prognosis, and follow-up tags
- source references
- approved report wording
- reviewer and version

When generating a report, the system should:

1. Normalize variant results from the pipeline.
2. Match each reportable variant against the interpretation library.
3. Select product-appropriate approved wording.
4. Preserve evidence boundaries when canine-specific evidence is limited.
5. Mark unmatched or low-confidence findings for manual interpretation review.

## Automatic Draft Structure

The structured draft should contain:

- sample and LIMS identifiers
- dog and hospital metadata
- product/panel and specimen information
- QC summary and reportability decision
- clinical background summary
- key variant table
- gene/variant interpretation paragraphs
- therapy/prognosis/diagnosis/follow-up implications
- limitations and evidence notes
- reviewer checklist
- LIMS callback payload preview

## Review Rules

Automatic generation should create a draft, not directly release a final report.

Final release requires:

- LIMS sample data is present
- clinical import is present or explicitly marked unavailable
- QC is reportable
- variant import is complete
- every reportable variant is matched to approved interpretation text or manually reviewed
- reviewer has approved the report draft

## LIMS Callback

After release, the system should write back:

- sample ID
- LIMS ID
- report status
- release time
- conclusion summary
- report file ID or URL
- reviewer
- optional structured result payload

