import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import * as dbc from "../../database-controller";


export const ClassInfo = ( {classID} ) => {
  const [classInfo, setClassInfo] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  //const classID = "I99sXFrMAw5qPXl3UuVq";
  console.log("1", classID);

  const fetchClassInfo = async () => {
    try {
      const classInfoData = await dbc.getClass(classID);
      console.log("2", classInfoData);

      const teacherData = [];
      for (const teacherID of classInfoData.Teachers) {
        const teacher = await dbc.getTeacher(teacherID);
        teacherData.push(teacher);
      }

      const studentData = [];
      for (const studentID of Object.keys(classInfoData.Students)) {
        const student = await dbc.getStudent(studentID);
        studentData.push({
          grade: classInfoData.Students[studentID],
          id: studentID,
          ...student,
        });
      }

      setClassInfo(classInfoData);
      setTeachers(teacherData);
      setStudents(studentData);
    } catch (error) {
      console.error("Error fetching class info or teachers:", error);
    }
  };
  useEffect(() => {
    fetchClassInfo();
  }, []);

  return (
    <Box>
      <Typography variant="h2">{classInfo.name}</Typography>
      <Typography variant="h4">Grade: {classInfo.grade}</Typography>

      <Typography variant="h4">Teachers:</Typography>

      {teachers.map((teacher, index) => (
        <Typography key={index} variant="h6">
          {teacher.last_name}, {teacher.first_name}
        </Typography>
      ))}

      <Typography variant="h4">
        Average:{" "}
        {students.reduce(
          (acc, student) => acc + student.grade / students.length,
          0
        )}
      </Typography>

      

      {students.map((student, index) => (
        <Typography key={index} variant="h6">
          {student.last_name}, {student.first_name}, {student.grade}
        </Typography>
      ))}
    </Box>

  );
};
