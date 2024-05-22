import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import * as dbc from "../../database-controller";


export const ClassInfo = ({ }) => {
  const [classInfo, setClassInfo] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [allStudentList, setAllStudentList] = useState([]);
  const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
  const [dialogOpenRemove, setDialogOpenRemove] = useState(false);
  const classID = "I99sXFrMAw5qPXl3UuVq";

  const fetchClassInfo = async () => {
    try {
      const classInfoData = await dbc.getClass(classID);

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

      studentData.sort((a,b) => a.last_name.localeCompare(b.last_name))

      const fetchAllStudentList = await dbc.getStudentsList();
      const filteredStudentList = fetchAllStudentList.filter(
        (student1) => !studentData.some((student2) => student2.id === student1.id)
      );
      setAllStudentList(filteredStudentList);

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

  const handleDialogueOpenAdd = () => {
    setDialogOpenAdd(true);
  };

  const handleDialogCloseAdd = () => {
    setDialogOpenAdd(false);
  };

  const handleDialogueOpenRemove = () => {
    setDialogOpenRemove(true);
  };

  const handleDialogCloseRemove = () => {
    setDialogOpenRemove(false);
  };

  const handleGradeChange = async (studentID, newGrade) => {
    try {
      await dbc.updateStudentGrade(classID, studentID, newGrade);
      setStudents(
        students.map((student) =>
          student.id === studentID ? { ...student, grade: newGrade  } : student
        )
      );
    } catch (error) {
      console.error("Error updating student grade:", error);
    }
  };
  


  const handleAddStudent = async (student) => {
    try {
      await dbc.addStudentToClass(classID, student.id);
      setStudents((students) => [...students, { ...student, grade: null, first_name: student.firstname, last_name: student.lastname}]);
      setDialogOpenAdd(false);

    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleRemoveStudent = async (student) => {
    try {
      await dbc.removeStudentFromClass(classID, student.id);
      setDialogOpenAdd(false);

    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    setAllStudentList(allStudentList.filter(
      (student1) => !students.some((student2) => student2.id === student1.id)
    ));
    console.log(students)
  }, [students])



  
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
          Average Grade:{" "}
          {calculateAverageGrade(students)}
        </Typography>

        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="contained" color="primary" onClick={handleDialogueOpenAdd}>
          Add Student
          </Button>

          <Button variant="contained" color="primary" onClick={handleDialogueOpenRemove}>
          Remove Student
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell align="right">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{`${student.last_name}, ${student.first_name} `}</TableCell>
                  <TableCell align="right">
                  <TextField
                    type="number"
                    value={student.grade !== null ? student.grade : ""}
                    placeholder={student.grade === null ? "N/A" : ""}
                    onChange={(e) => handleGradeChange(student.id, parseFloat(e.target.value) || null)}
                  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpenAdd} onClose={handleDialogCloseAdd}>
        <DialogTitle>Add Student to Class</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Add</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allStudentList.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      {student.lastname}, {student.firstname}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddStudent(student)}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseAdd} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpenRemove} onClose={handleDialogCloseRemove}>
        <DialogTitle>Remove Student to Class</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      {student.last_name}, {student.first_name}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRemoveStudent(student)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseRemove} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      </Box>
    );
};

const calculateAverageGrade = (students) => {
  const gradedStudents = students.filter(student => student.grade !== null);
  if (gradedStudents.length === 0) return "N/A";
  return (gradedStudents.reduce((acc, student) => acc + student.grade, 0) / gradedStudents.length).toFixed(2);
};