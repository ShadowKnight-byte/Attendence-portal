# Assignment 1 — Agile, Git, and CI/CD

## Application

Campus Attendance Portal is a College ERP prototype. A class coordinator can maintain a student list, mark daily attendance, see date-based totals, search the register, and export a CSV.

## Q1: Agile product backlog

The prioritised user stories and testable acceptance criteria are in `docs/AGILE_BACKLOG.md`. Add these issues to a Jira Kanban project and move them through To Do, In Progress, and Done.

## Q2: Git and GitHub source management

The project uses `main` for stable deployable code and short-lived feature branches for work. The workflow and example commands are in `docs/GIT_WORKFLOW.md`. Create a feature branch, push it, open a pull request, wait for CI checks, and merge it into `main` to demonstrate collaboration.

## Q3: CI/CD

The workflow in `.github/workflows/ci-cd.yml` runs automated unit tests, builds the static site, packages the build, and deploys it to GitHub Pages after a successful push to `main`. Pull requests run tests and build checks without deployment. Enable GitHub Pages with **Settings → Pages → GitHub Actions**.

## Demo sequence

1. Open the deployed attendance portal.
2. Add a student and mark Present or Absent for a date.
3. Change the date to show the date-specific totals.
4. Export the register to CSV.
5. Show the Jira backlog, a GitHub feature branch/pull request, and the successful Actions workflow run.

## Limits

The prototype stores data in browser localStorage and is intended for coursework demonstration. It is not a secure or shared production student database.
