# Data Model

This document describes the production data structure for Canis OncoTrack.

## Design Principle

LIMS is the source of truth for sample registration and patient metadata. Canis OncoTrack stores synchronized LIMS records and then manages downstream QC, variants, interpretation, and reports.

## Patient

Represents the dog and submitting owner or hospital.

| Field | Meaning | Notes |
| --- | --- | --- |
| `name` | Dog name | Required |
| `species` | Species | Defaults to dog |
| `breed` | Breed | Optional |
| `sex` | Sex | Optional |
| `age` | Age | Display text, such as `8 years` |
| `owner_or_hospital` | Owner or hospital | Optional but recommended |

## Sample

Represents one tumor genomic testing sample synchronized from LIMS.

| Field | Meaning | Notes |
| --- | --- | --- |
| `sample_id` | Sample ID | Unique, e.g. `TArgos0181-T` |
| `lims_id` | LIMS record ID | Optional but recommended |
| `source` | Data source | Defaults to `LIMS` |
| `lims_synced_at` | Last LIMS sync time | Traceability |
| `lims_payload` | Raw LIMS payload | JSON audit snapshot |
| `patient` | Linked dog | Foreign key |
| `tumor_type` | Cancer type | Required |
| `anatomical_site` | Sampling site | Optional |
| `specimen_type` | Specimen type | Optional |
| `panel` | Testing panel | Required |
| `received_date` | Received date | High-sensitivity field from LIMS |
| `status` | Workflow status | sample workflow stage |
| `qc_status` | QC status | sequencing or bioinformatics QC |
| `report_status` | Report status | report lifecycle |
| `notes` | Notes | Free text |

## Variant

Represents one molecular finding for a sample.

| Field | Meaning | Notes |
| --- | --- | --- |
| `sample` | Linked sample | Foreign key |
| `gene` | Gene symbol | e.g. `KIT`, `TP53`, `BRAF` |
| `alteration` | Alteration | e.g. `p.D816V`, `loss` |
| `variant_type` | Variant type | `SNV`, `Indel`, `CNV`, `Fusion`, `Other` |
| `vaf` | Variant allele fraction | Optional decimal |
| `copy_number` | Copy number | Optional decimal |
| `tier` | Evidence tier | Optional |
| `interpretation` | Interpretation | Optional report-oriented text |

## TumorGeneInterpretation

Represents the maintained tumor gene interpretation library used by automatic report generation.

| Field | Meaning | Notes |
| --- | --- | --- |
| `gene` | Gene symbol | e.g. `KIT`, `TP53`, `BRAF` |
| `alteration_pattern` | Variant or pattern | Exact variant, hotspot, exon, CNV, fusion, or wildcard rule |
| `variant_type` | Variant type | `SNV`, `Indel`, `CNV`, `Fusion`, `Other` |
| `tumor_type` | Tumor context | Optional tumor-specific wording |
| `species_scope` | Evidence scope | Canine, cross-species, human-derived, exploratory |
| `evidence_tier` | Evidence level | Internal tier or product rule |
| `clinical_tags` | Clinical relevance | Diagnosis, prognosis, therapy, follow-up |
| `summary` | Evidence summary | Internal review text |
| `report_text` | Approved report wording | Text inserted into report draft |
| `references` | Evidence references | Structured list |
| `version` | Library version | Required for audit |
| `reviewer` | Approved by | Required before production use |
| `is_active` | Active flag | Allows retiring outdated wording |

## Report

Represents report generation and review state.

| Field | Meaning | Notes |
| --- | --- | --- |
| `sample` | Linked sample | One-to-one |
| `status` | Report status | Mirrors or refines sample report status |
| `conclusion` | Report conclusion | Generated draft conclusion |
| `draft_payload` | Structured report draft | JSON used for Word/PDF rendering |
| `reviewer` | Reviewer | Optional |
| `generated_at` | Generated time | Optional |
| `released_at` | Released time | Optional |
| `lims_synced_at` | LIMS callback time | Optional |
| `lims_sync_payload` | LIMS callback payload | JSON audit snapshot |
| `file` | Report file | Stored under `media/reports/` |
| `review_notes` | Review notes | Optional |

## ClinicalInfo

Represents imported clinical context for one sample. It is not intended for routine manual typing in the web UI.

| Field | Meaning | Notes |
| --- | --- | --- |
| `sample` | Linked sample | One-to-one |
| `imported_at` | Import time | Set during backend import |
| `source` | Import source | e.g. LIMS, HIS, EMR, file import |
| `chief_complaint` | Chief complaint | Optional |
| `clinical_diagnosis` | Clinical diagnosis | Optional |
| `physical_exam` | Physical exam records | JSON list |
| `imaging` | Imaging records | JSON list |
| `pathology` | Pathology records | JSON list |
| `laboratory_tests` | Laboratory test records | JSON list |
| `treatments` | Treatment records | JSON list |
| `prognosis` | Prognosis assessment | Text |
| `follow_up` | Follow-up records | JSON list |
| `source_payload` | Raw imported payload | JSON audit snapshot |

## Field Ownership

| Field group | Source of truth |
| --- | --- |
| Sample ID, dog metadata, owner/hospital, tumor type, received date | LIMS |
| Sequencing workflow status | Canis OncoTrack or sequencing pipeline |
| QC status and metrics | Canis OncoTrack or bioinformatics pipeline |
| Variant results | Bioinformatics pipeline |
| Clinical exam, treatment, prognosis, follow-up | Imported from backend clinical source |
| Tumor gene interpretation library | Canis OncoTrack curated knowledge base |
| Interpretation and report review | Canis OncoTrack reviewer workflow |

## Workbook Mapping Notes

If importing from a workbook-driven report pipeline:

- `basic_info`: map to `Patient` and `Sample`
- `qc_metrics`: map to `Sample.qc_status` and future QC metric tables
- `variant_results`: map to `Variant`
- `VUS_results`: map to `Variant` with lower or uncertain evidence tier

Do not infer sensitive dates. Received dates and diagnosis dates should come from authoritative source fields.
