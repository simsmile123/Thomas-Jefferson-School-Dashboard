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

export const ClassInfo = ({ classID }) => {
  const [classInfo, setClassInfo] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [allStudentList, setAllStudentList] = useState([]);
  const [allTeacherList, setAllTeacherList] = useState([]);
  const [dialogAddStudent, setDialogAddStudent] = useState(false);
  const [dialogRemoveStudent, setDialogRemoveStudent] = useState(false);
  const [dialogAddTeacher, setDialogAddTeacher] = useState(false);
  const [dialogRemoveTeacher, setDialogRemoveTeacher] = useState(false);

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

      const fetchAllTeacherList = await dbc.getTeachersList();
      const filteredTeacherList = fetchAllTeacherList.filter(
        (teacher1) =>
          !teacherData.some((teacher2) => teacher2.id === teacher1.id)
      );
      setAllTeacherList(filteredTeacherList);

      studentData.sort((a, b) => a.last_name.localeCompare(b.last_name));

      const fetchAllStudentList = await dbc.getStudentsList();
      const filteredStudentList = fetchAllStudentList.filter(
        (student1) =>
          !studentData.some((student2) => student2.id === student1.id)
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

  const handleGradeChange = async (studentID, newGrade) => {
    try {
      await dbc.updateStudentGrade(classID, studentID, newGrade);
      setStudents(
        students.map((student) =>
          student.id === studentID ? { ...student, grade: newGrade } : student
        )
      );
    } catch (error) {
      console.error("Error updating student grade:", error);
    }
  };

  const handleAddStudent = async (student) => {
    try {
      await dbc.addStudentToClass(classID, student.id);
      setStudents((students) => [
        ...students,
        {
          ...student,
          grade: null,
          first_name: student.first_name,
          last_name: student.last_name,
        },
      ]);
      setAllStudentList(allStudentList.filter((s) => s.id !== student.id));
      setDialogAddStudent(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleRemoveStudent = async (student) => {
    try {
      await dbc.removeStudentFromClass(classID, student.id);
      setStudents(students.filter((s) => s.id !== student.id));
      setAllStudentList([...allStudentList, student]);
      setDialogRemoveStudent(false);
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const handleAddTeacher = async (teacher) => {
    try {
      await dbc.addTeacherToClass(classID, teacher.id);
      setTeachers([...teachers, teacher]);
      setAllTeacherList(allTeacherList.filter((t) => t.id !== teacher.id));
      setDialogAddTeacher(false);
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  const handleRemoveTeacher = async (teacher) => {
    try {
      await dbc.removeTeacherFromClass(classID, teacher.id);
      setTeachers(teachers.filter((t) => t.id !== teacher.id));
      setAllTeacherList([...allTeacherList, teacher]);
      setDialogRemoveTeacher(false);
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };

  return (
    <div className="class-info-container">
      <h1 style={{ marginBottom: "5px" }}>{classInfo.name}</h1>
      <h2 style={{ fontWeight: "normal" }}>Grade {classInfo.grade}</h2>
      <div style={{ display: "flex" }}>
        <Typography variant="h5">Teachers:</Typography>
        {teachers.map((teacher, index) => (
          <div className="teacher-name-info">
            <Typography key={index} variant="h6">
              {teacher.last_name.toUpperCase()},{" "}
              {teacher.first_name.toUpperCase()}
            </Typography>
          </div>
        ))}
      </div>

      <div className="add-remove-buttons">
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogAddTeacher(true)}
          >
            Add Teacher
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogRemoveTeacher(true)}
          >
            Remove Teacher
          </Button>
        </Box>
      </div>

      <Typography variant="h5">
        Average Grade: {calculateAverageGrade(students)}
      </Typography>

      <div className="add-remove-buttons">
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogAddStudent(true)}
          >
            Add Student
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogRemoveStudent(true)}
          >
            Remove Student
          </Button>
        </Box>
      </div>

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
                    onChange={(e) =>
                      handleGradeChange(
                        student.id,
                        parseFloat(e.target.value) || null
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogBox
        peopleList={allTeacherList}
        dialogOpen={dialogAddTeacher}
        setDialogOpen={setDialogAddTeacher}
        handleAction={handleAddTeacher}
        subject="Teacher"
        action="Add"
      />

      <DialogBox
        peopleList={teachers}
        dialogOpen={dialogRemoveTeacher}
        setDialogOpen={setDialogRemoveTeacher}
        handleAction={handleRemoveTeacher}
        subject="Teacher"
        action="Remove"
      />

      <DialogBox
        peopleList={allStudentList}
        dialogOpen={dialogAddStudent}
        setDialogOpen={setDialogAddStudent}
        handleAction={handleAddStudent}
        subject="Student"
        action="Add"
      />

      <DialogBox
        peopleList={students}
        dialogOpen={dialogRemoveStudent}
        setDialogOpen={setDialogRemoveStudent}
        handleAction={handleRemoveStudent}
        subject="Student"
        action="Remove"
      />
    </div>
  );
};

const calculateAverageGrade = (students) => {
  const gradedStudents = students.filter((student) => student.grade !== null);
  if (gradedStudents.length === 0) return "N/A";
  return (
    gradedStudents.reduce((acc, student) => acc + student.grade, 0) /
    gradedStudents.length
  ).toFixed(2);
};

const DialogBox = ({
  peopleList,
  dialogOpen,
  setDialogOpen,
  handleAction,
  subject,
  action,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>{`${action} ${subject}`}</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{subject} Name</TableCell>
                <TableCell>{action}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {peopleList.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    {person.last_name}, {person.first_name}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAction(person)}
                    >
                      {action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
