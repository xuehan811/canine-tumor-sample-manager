# LIMS Sync Workflow

Canis OncoTrack should not be the primary source for sample registration. The authoritative sample master data should come from LIMS.

The web system is responsible for:

- displaying synchronized sample records
- tracking sequencing, bioinformatics, QC, interpretation, and report status
- storing gene variants and report review data
- allowing limited manual correction for exceptional cases

## Recommended Architecture

```text
LIMS
  |
  | scheduled API/database/export sync
  v
Canis OncoTrack backend
  |
  v
PostgreSQL
  |
  v
Web dashboard
```

## Sync Modes

### API Pull

Backend periodically calls a LIMS API and upserts samples into Canis OncoTrack.

### Database Read Replica

Backend reads from a LIMS read-only database account and maps rows into the local data model.

### File Drop

LIMS exports CSV/JSON/XLSX to a shared folder. A scheduled job imports new files.

## Current Scaffold

The current backend supports standardized JSON import:

```text
POST /api/lims/sync/
```

It also includes a management command:

```bash
python manage.py sync_lims_json /path/to/lims_samples.json
```

## Standard JSON Shape

```json
{
  "samples": [
    {
      "lims_id": "LIMS-20260609-001",
      "sample_id": "TArgos0188-T",
      "patient": {
        "name": "雪球",
        "species": "犬",
        "breed": "金毛寻回犬",
        "sex": "雌性",
        "age": "9岁",
        "owner_or_hospital": "南京瑞宠动物医院"
      },
      "tumor_type": "肥大细胞瘤",
      "anatomical_site": "皮肤肿物",
      "specimen_type": "FFPE",
      "panel": "犬肿瘤154基因Panel",
      "received_date": "2026-06-03",
      "status": "收样",
      "qc_status": "通过",
      "report_status": "未生成",
      "notes": "LIMS同步"
    }
  ]
}
```

## Field Ownership

| Field group | Source of truth | Editable in web? |
| --- | --- | --- |
| Sample ID | LIMS | No, except admin correction |
| Dog name / breed / age / sex | LIMS | No, except admin correction |
| Owner or hospital | LIMS | No, except admin correction |
| Tumor type / site / specimen type | LIMS | No, except admin correction |
| Received date | LIMS | High-sensitivity, manual correction only with audit trail |
| Sequencing status | Canis OncoTrack or pipeline | Yes |
| QC status | Canis OncoTrack or pipeline | Yes |
| Variant results | Bioinformatics pipeline | Imported, then reviewable |
| Interpretation | Canis OncoTrack | Yes |
| Report status | Canis OncoTrack | Yes |

## Implementation Notes

- Sync should be idempotent: use `sample_id` as the stable upsert key.
- Store `lims_id`, `lims_synced_at`, and `lims_payload` for traceability.
- Do not overwrite downstream interpretation/report fields unless the LIMS field is explicitly authoritative.
- Keep raw LIMS payload for audit and troubleshooting.
- For production, add an operation log before allowing manual correction.
