export const ATTENDANCE_STATUSES = Object.freeze(["Present", "Absent"]);

export function normalizeText(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export function addStudent(students, { name, rollNumber, id }) {
  const cleanName = normalizeText(name);
  const cleanRoll = normalizeText(rollNumber).toUpperCase();
  if (!cleanName) throw new Error("Enter the student's name.");
  if (!cleanRoll) throw new Error("Enter the student's roll number.");
  if (students.some((student) => student.rollNumber.toLowerCase() === cleanRoll.toLowerCase())) {
    throw new Error("That roll number is already in the class list.");
  }
  return [...students, { id: id ?? crypto.randomUUID(), name: cleanName, rollNumber: cleanRoll }];
}

export function setAttendance(records, { studentId, date, status }) {
  if (!studentId || !date) throw new Error("Choose a student and date.");
  if (!ATTENDANCE_STATUSES.includes(status)) throw new Error("Choose Present or Absent.");
  const existing = records.findIndex((record) => record.studentId === studentId && record.date === date);
  if (existing < 0) return [...records, { studentId, date, status }];
  return records.map((record, index) => index === existing ? { ...record, status } : record);
}

export function getAttendance(records, studentId, date) {
  return records.find((record) => record.studentId === studentId && record.date === date)?.status ?? "Unmarked";
}

export function summarizeAttendance(students, records, date) {
  const present = students.filter((student) => getAttendance(records, student.id, date) === "Present").length;
  const absent = students.filter((student) => getAttendance(records, student.id, date) === "Absent").length;
  const marked = present + absent;
  return { total: students.length, present, absent, unmarked: students.length - marked, rate: marked ? Math.round((present / marked) * 100) : 0 };
}

export function removeStudent(students, records, studentId) {
  return {
    students: students.filter((student) => student.id !== studentId),
    records: records.filter((record) => record.studentId !== studentId),
  };
}

export function escapeCSV(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
