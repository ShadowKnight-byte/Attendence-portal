import test from "node:test";
import assert from "node:assert/strict";
import { addStudent, getAttendance, removeStudent, setAttendance, summarizeAttendance, escapeCSV } from "../src/attendance.js";

test("adds a normalized student and uppercases the roll number", () => {
  const result = addStudent([], { name: "  Asha   Patel ", rollNumber: " cse-024 ", id: "s1" });
  assert.deepEqual(result, [{ id: "s1", name: "Asha Patel", rollNumber: "CSE-024" }]);
});

test("rejects empty names and duplicate roll numbers", () => {
  assert.throws(() => addStudent([], { name: " ", rollNumber: "1" }), /name/);
  const students = [{ id: "s1", name: "Asha", rollNumber: "CSE-024" }];
  assert.throws(() => addStudent(students, { name: "Mina", rollNumber: "cse-024" }), /already/);
});

test("attendance is unique per student and date and can be changed", () => {
  const initial = setAttendance([], { studentId: "s1", date: "2026-10-23", status: "Present" });
  const updated = setAttendance(initial, { studentId: "s1", date: "2026-10-23", status: "Absent" });
  assert.equal(updated.length, 1);
  assert.equal(getAttendance(updated, "s1", "2026-10-23"), "Absent");
});

test("summarizes present, absent, unmarked, and rate for a chosen date", () => {
  const students = [{ id: "s1" }, { id: "s2" }, { id: "s3" }];
  const records = [
    { studentId: "s1", date: "2026-10-23", status: "Present" },
    { studentId: "s2", date: "2026-10-23", status: "Absent" },
    { studentId: "s3", date: "2026-10-22", status: "Present" },
  ];
  assert.deepEqual(summarizeAttendance(students, records, "2026-10-23"), { total: 3, present: 1, absent: 1, unmarked: 1, rate: 50 });
});

test("removes the student and their attendance history", () => {
  const result = removeStudent([{ id: "s1" }, { id: "s2" }], [{ studentId: "s1" }, { studentId: "s2" }], "s1");
  assert.deepEqual(result, { students: [{ id: "s2" }], records: [{ studentId: "s2" }] });
});

test("escapes CSV values containing commas and quotes", () => {
  assert.equal(escapeCSV('Patel, "Asha"'), '"Patel, ""Asha"""');
});
