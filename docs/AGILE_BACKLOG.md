# Agile product backlog — Campus Attendance Portal

**Product domain:** College ERP / student attendance management  
**Product goal:** Let a class coordinator maintain a student list, record daily attendance, and review a date-specific summary.

## Prioritised user stories

| Priority | Story | Estimate | Acceptance criteria |
|---|---|---:|---|
| P1 | As a class coordinator, I want to add a student with a name and roll number so I can build the class register. | 3 points | Given valid name and roll number, when I submit the form, the student appears in the register. Given a blank field or an existing roll number, when I submit, the app shows an error and does not add a duplicate. |
| P1 | As a class coordinator, I want to mark a student present or absent for a chosen date so I can record daily attendance. | 5 points | Given a student and selected date, when I choose Present or Absent, the status and totals update. Given an existing record for that student and date, when I change the status, the existing record is updated rather than duplicated. |
| P1 | As a class coordinator, I want to see present, absent, unmarked, and attendance-rate totals so I can review the class at a glance. | 3 points | Given records for the selected date, when the page renders, totals match those records. Changing the date updates the totals to that date. |
| P2 | As a class coordinator, I want to search by student name or roll number so I can find a record quickly. | 2 points | Given a search term, when I type it, matching students remain visible; clearing the search restores the full list. |
| P2 | As a class coordinator, I want to export the selected date's register as CSV so I can share or archive it. | 3 points | Given students and a selected date, when I choose Export CSV, a CSV downloads with roll number, name, date, and status, including Unmarked students. |
| P2 | As a class coordinator, I want my changes to remain available after refreshing the page so I do not lose the register during normal use. | 3 points | Given saved class and attendance data, when I reload the app in the same browser, students and records remain available. |

## Definition of done

- Acceptance criteria are met and checked manually or by automated unit tests.
- The app builds without errors.
- A pull request is reviewed before merging into `main`.
- The CI/CD workflow passes and the updated site deploys from `main`.

## Jira setup

Create a Jira Kanban project named **Campus Attendance Portal**. Add the six stories above as Task or Story issues, set priorities to match P1/P2, and use To Do, In Progress, and Done. Keep the board and issue details as evidence for the Agile backlog requirement.
