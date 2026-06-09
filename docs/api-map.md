# API Map

Base path behind nginx:

```text
/api/
```

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/samples/` | List synchronized samples |
| `POST` | `/api/samples/` | Manual exception entry or admin correction |
| `GET` | `/api/samples/{id}/` | Sample detail |
| `PATCH` | `/api/samples/{id}/` | Update downstream status fields |
| `GET` | `/api/patients/` | List dogs/patients |
| `GET` | `/api/variants/` | List variants |
| `GET` | `/api/reports/` | List reports |
| `POST` | `/api/reports/generate/` | Generate structured report draft for one sample |
| `POST` | `/api/reports/{id}/release/` | Mark report as released |
| `POST` | `/api/reports/{id}/sync-lims/` | Mark report callback payload as synced to LIMS |
| `GET/POST/PATCH/DELETE` | `/api/tumor-gene-interpretations/` | Maintain the tumor gene interpretation library |
| `GET` | `/api/clinical-info/` | List imported clinical records |
| `GET` | `/api/dashboard/summary/` | Dashboard counters |
| `POST` | `/api/lims/sync/` | Upsert sample master data from LIMS |
| `POST` | `/api/clinical/import/` | Import clinical exam, treatment, prognosis, and follow-up data |
| `GET` | `/api/schema/swagger-ui/` | Swagger UI |

## Example LIMS Sync Payload

```json
{
  "samples": [
    {
      "lims_id": "LIMS-20260609-001",
      "sample_id": "TArgos0188-T",
      "patient": {
        "name": "Snowball",
        "species": "dog",
        "breed": "Golden Retriever",
        "sex": "female",
        "age": "9 years",
        "owner_or_hospital": "Nanjing Pet Hospital"
      },
      "tumor_type": "mast cell tumor",
      "anatomical_site": "skin mass",
      "specimen_type": "FFPE",
      "panel": "Canine tumor 154-gene panel",
      "received_date": "2026-06-03",
      "status": "received",
      "qc_status": "pass",
      "report_status": "not generated",
      "notes": "Imported from LIMS"
    }
  ]
}
```

## Manual Entry

The frontend still has a manual correction form for demo and exception handling. In production, routine sample creation should come from LIMS sync.

## Example Generate Report Payload

```json
{
  "sample_id": "TArgos0188-T"
}
```

The response contains report status, conclusion, and `draft_payload`.

The draft payload now includes:

- report template name (`新版报告模板-TArgos`)
- interpretation workflow summary (`TArgos 肿瘤基因解读流程`)
- interpretation library summary
- matched interpretation records
- unmatched variants requiring manual review

## Example Clinical Import Payload

```json
{
  "clinical_records": [
    {
      "sample_id": "TArgos0188-T",
      "source": "clinical_file_import",
      "chief_complaint": "Skin mass gradually enlarged.",
      "clinical_diagnosis": "Mast cell tumor",
      "physical_exam": [
        {
          "date": "2026-06-01",
          "type": "physical exam",
          "result": "Subcutaneous mass, 3.2 cm."
        }
      ],
      "imaging": [
        {
          "date": "2026-06-02",
          "type": "thoracic imaging",
          "result": "No definite distant metastasis."
        }
      ],
      "pathology": [
        {
          "date": "2026-06-03",
          "type": "histopathology",
          "result": "High-grade mast cell tumor."
        }
      ],
      "laboratory_tests": [],
      "treatments": [
        {
          "date": "2026-06-04",
          "plan": "Wide local excision and post-operative care."
        }
      ],
      "prognosis": "Recurrence risk should be evaluated with margin status and KIT result.",
      "follow_up": [
        {
          "date": "2026-07-01",
          "note": "Recheck local surgical site and regional lymph nodes."
        }
      ]
    }
  ]
}
```
