# CI/CD pipeline

The workflow in `.github/workflows/ci-cd.yml` is the project's build, test, package, and deployment pipeline.

1. **Trigger:** runs for pushes to `main`, pull requests targeting `main`, or a manual run.
2. **Test:** uses Node.js and runs the built-in Node test suite with `npm test`.
3. **Build:** runs `npm run build` to create a static site in `dist/`.
4. **Package:** uploads `dist/` as a GitHub Pages artifact.
5. **Deploy:** after a successful push to `main` or manual run on `main`, configures and deploys the package to GitHub Pages. Pull requests and manual runs on feature branches run validation but do not deploy.

## One-time repository setting

In GitHub, open **Settings → Pages** and set the publishing source to **GitHub Actions**. The workflow needs that Pages source before the deploy job can publish the site. A public repository is eligible for Pages on GitHub Free.

## Checks

- Unit tests cover student validation, duplicate roll numbers, attendance updates, date-specific summaries, record removal, and CSV escaping.
- The build script produces `dist/index.html`, `dist/styles.css`, and `dist/src/` for deployment.
