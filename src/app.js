import { addStudent, getAttendance, removeStudent, setAttendance, summarizeAttendance, escapeCSV } from "./attendance.js";

const STORAGE_KEY = "campusAttendance.v1";
const dateInput = document.querySelector("#attendance-date");
const studentRows = document.querySelector("#student-rows");
const form = document.querySelector("#student-form");
const message = document.querySelector("#message");
const searchInput = document.querySelector("#student-search");
const emptyState = document.querySelector("#empty-state");

const localToday = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
};

function readData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { students: Array.isArray(saved?.students) ? saved.students : [], records: Array.isArray(saved?.records) ? saved.records : [] };
  } catch {
    return { students: [], records: [] };
  }
}

let data = readData();
dateInput.value = localToday();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  document.querySelector("#last-updated").textContent = `Saved ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function htmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function render() {
  const date = dateInput.value;
  const summary = summarizeAttendance(data.students, data.records, date);
  document.querySelector("#total-count").textContent = summary.total;
  document.querySelector("#present-count").textContent = summary.present;
  document.querySelector("#absent-count").textContent = summary.absent;
  document.querySelector("#rate-count").textContent = `${summary.rate}%`;
  document.querySelector("#list-count").textContent = `${data.students.length} ${data.students.length === 1 ? "student" : "students"}`;

  const query = searchInput.value.trim().toLocaleLowerCase();
  const filtered = data.students.filter((student) => `${student.name} ${student.rollNumber}`.toLocaleLowerCase().includes(query));
  studentRows.replaceChildren();
  emptyState.hidden = data.students.length > 0;

  filtered.forEach((student) => {
    const status = getAttendance(data.records, student.id, date);
    const row = document.createElement("tr");
    const initials = student.name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    row.innerHTML = `<td><span class="student-cell"><span class="student-avatar">${htmlEscape(initials)}</span><span><strong>${htmlEscape(student.name)}</strong><small>Student</small></span></span></td><td><span class="roll-tag">${htmlEscape(student.rollNumber)}</span></td><td><span class="status-pill ${status.toLowerCase()}"><i></i>${status}</span></td><td><div class="row-actions"><button class="mark-button present-action" type="button" data-action="Present" data-id="${htmlEscape(student.id)}" aria-label="Mark ${htmlEscape(student.name)} present">Present</button><button class="mark-button absent-action" type="button" data-action="Absent" data-id="${htmlEscape(student.id)}" aria-label="Mark ${htmlEscape(student.name)} absent">Absent</button></div></td><td><button class="remove-button" type="button" data-remove="${htmlEscape(student.id)}" aria-label="Remove ${htmlEscape(student.name)}">×</button></td>`;
    studentRows.append(row);
  });

  if (data.students.length && !filtered.length) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="5" class="no-results">No students match that search.</td>';
    studentRows.append(row);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  try {
    data.students = addStudent(data.students, { name: fields.get("name"), rollNumber: fields.get("roll") });
    save(); form.reset(); message.textContent = "Student added to the class list."; render();
  } catch (error) {
    message.textContent = error.message;
  }
});

dateInput.addEventListener("change", render);
searchInput.addEventListener("input", render);

studentRows.addEventListener("click", (event) => {
  const markButton = event.target.closest("button[data-action]");
  const removeButton = event.target.closest("button[data-remove]");
  if (markButton) {
    try {
      data.records = setAttendance(data.records, { studentId: markButton.dataset.id, date: dateInput.value, status: markButton.dataset.action });
      save(); message.textContent = `Attendance marked ${markButton.dataset.action.toLowerCase()}.`; render();
    } catch (error) { message.textContent = error.message; }
  } else if (removeButton && window.confirm("Remove this student and all their attendance records?")) {
    const result = removeStudent(data.students, data.records, removeButton.dataset.remove);
    data = { students: result.students, records: result.records };
    save(); message.textContent = "Student removed from the register."; render();
  }
});

document.querySelector("#export-button").addEventListener("click", () => {
  const date = dateInput.value;
  const lines = [["Roll number", "Student name", "Date", "Status"], ...data.students.map((student) => [student.rollNumber, student.name, date, getAttendance(data.records, student.id, date)])];
  const csv = lines.map((line) => line.map(escapeCSV).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `attendance-${date}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  message.textContent = "Attendance CSV downloaded.";
});

render();
