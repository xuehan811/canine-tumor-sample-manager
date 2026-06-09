# Canis OncoTrack

Canine tumor genomic testing sample management system.

This project is packaged for migration to a deployment server. The current workstation does not need to run backend services.

## Important Product Direction

Sample registration data should come from LIMS, similar to the Mercury Manager reference site. The web app is not intended to be the primary place where routine sample information is typed in.

The web app is used for:

- viewing LIMS-synchronized samples
- tracking sequencing, bioinformatics, QC, interpretation, and report status
- showing backend-imported clinical exams, treatments, prognosis, and follow-up
- managing variants and report review
- generating structured report drafts from LIMS data, pipeline results, and the tumor gene interpretation library
- syncing released reports back to LIMS
- handling limited manual correction or exceptional补录

## Included Files

- Static frontend: `index.html`, `styles.css`, `app.js`
- Django REST API backend: `backend/`
- PostgreSQL + backend + nginx compose file: `docker-compose.yml`
- nginx reverse proxy config: `deploy/nginx.conf`
- Environment template: `.env.example`
- Server deployment guide: `deploy/README.md`
- GitHub Pages static preview guide: `docs/github-pages.md`
- LIMS sync guide: `docs/lims-sync.md`
- Report generation workflow: `docs/report-generation.md`
- Report generation 513 reference: `docs/report-generation-513-reference.md`
- Data model guide: `docs/data-model.md`
- API map: `docs/api-map.md`
- Migration package manifest: `PACKAGE_MANIFEST.md`

## Architecture

```text
LIMS
  |
  v
Canis OncoTrack backend
  |
  v
PostgreSQL
  |
  v
nginx + web dashboard
```

## Deployment

Read:

```text
deploy/README.md
```

For a static GitHub Pages preview, read:

```text
docs/github-pages.md
```

Shortest server path:

```bash
cd canine-tumor-sample-manager
cp .env.example .env
nano .env
docker compose up -d --build
docker compose exec backend python manage.py createsuperuser
```

Then open:

```text
http://server:APP_PORT/
http://server:APP_PORT/admin/
http://server:APP_PORT/api/schema/swagger-ui/
```

## Do Not Migrate Local Runtime Files

```text
backend/.venv/
backend/db.sqlite3
backend/media/
backend/staticfiles/
__pycache__/
```

They are excluded in `.dockerignore` and `.gitignore`.

## Next Development Steps

- Implement the real LIMS connector: API, read-only database, or file-drop import
- Implement the clinical information importer: HIS/EMR/LIMS/file import
- Add scheduled sync task
- Add operation/audit log for manual corrections
- Add login and role permissions
- Add variant result batch import
- Add report generation workflow
- Render structured report drafts to Word/PDF templates
