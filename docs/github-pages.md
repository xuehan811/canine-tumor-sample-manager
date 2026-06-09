# GitHub Pages Static Preview Deployment

GitHub Pages is suitable for publishing the static preview of Canis OncoTrack:

- `index.html`
- `styles.css`
- `app.js`
- `.nojekyll`

It is not a production runtime for PostgreSQL, Django, LIMS sync, clinical import jobs, or report generation workers. Those features still need the Docker/nginx/PostgreSQL server deployment.

## Recommended GitHub Setup

Do not share your GitHub password in chat.

Use one of these safe methods:

1. Log in to GitHub yourself in the browser, then let Codex help operate the already logged-in page.
2. Create the repository yourself and provide only the repository URL.
3. If command-line publishing is needed later, use a short-lived fine-grained token with only the minimum repository permission, then revoke it after deployment.

## Publish From GitHub Web UI

1. Create a new GitHub repository, for example:

   ```text
   canine-tumor-sample-manager
   ```

2. Upload the project files to the repository root.

3. Open repository settings:

   ```text
   Settings -> Pages
   ```

4. Configure:

   ```text
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

5. Save.

6. Wait for GitHub Pages to build. The preview URL is usually:

   ```text
   https://<github-username>.github.io/canine-tumor-sample-manager/
   ```

## After Publishing

The static preview will show demo/local data. The app will try `/api/samples/`; on GitHub Pages that API does not exist, so the page falls back to built-in demo data and browser local storage.

For the real system, deploy the full backend package using:

```text
deploy/README.md
```

