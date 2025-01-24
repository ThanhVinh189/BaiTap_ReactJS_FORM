import React from "react";
import { useDispatch } from "react-redux";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import { addStudent } from "./slice";

export default function Students() {
  const dispatch = useDispatch();

  return (
    <div>
      <StudentForm addStudent={(student) => dispatch(addStudent(student))} />
      <StudentTable />
    </div>
  );
}
