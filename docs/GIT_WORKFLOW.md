# Git and GitHub workflow

## Repository practices

- `main` is the stable branch used for deployment.
- Create a short-lived branch for each story, for example `feature/attendance-csv` or `fix/duplicate-roll-number`.
- Make small commits with action-oriented messages, such as `Add attendance summary cards`.
- Open a pull request from the feature branch to `main`.
- Require the Campus Attendance CI/CD workflow to pass before merging.
- Merge the pull request and remove the feature branch after it is merged.

## Commands

```bash
git switch main
git pull origin main
git switch -c feature/attendance-csv
# make and review the change
git add .
git commit -m "Add attendance CSV export"
git push -u origin feature/attendance-csv
```

Then create a pull request on GitHub, wait for the checks, and merge it into `main`.

## Demonstration evidence

Use GitHub's **Branches**, **Pull requests**, and **Actions** tabs to show the branch, review/merge, and passing CI/CD workflow. Avoid committing generated `dist/` files; the workflow builds and packages them automatically.
