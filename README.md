# Campus Attendance Portal

A small College ERP prototype for maintaining a class list and marking daily attendance. This project is used to demonstrate Agile backlog planning, Git/GitHub collaboration, and a GitHub Actions CI/CD pipeline.

## Run locally

Requires Node.js 22 or later.

```bash
npm test
npm run build
```

Serve the `dist/` folder with any static web server, for example `python -m http.server 8000 --directory dist`, then open `http://localhost:8000`. The app stores records in local browser storage for this demo.

## Features

- Add students with unique roll numbers.
- Mark each student Present or Absent for a selected date.
- View present, absent, unmarked, and attendance-rate totals.
- Search the class list and export the selected day's register to CSV.
- Save records in the current browser on this device.

## Assignment evidence

- [Agile backlog and acceptance criteria](docs/AGILE_BACKLOG.md)
- [Git branching and collaboration workflow](docs/GIT_WORKFLOW.md)
- [CI/CD pipeline and Pages setup](docs/CI_CD.md)
- Jira board: create the user stories from the backlog in To Do / In Progress / Done.
- GitHub Actions: see the **Campus Attendance CI/CD** workflow.

## Data limits

This is a learning prototype, not a production student-record system. It has no login, server-side database, access control, or multi-device sync. Data stays in the current browser profile.
