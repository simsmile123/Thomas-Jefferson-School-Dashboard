import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  FieldValue,
  deleteDoc,
} from "firebase/firestore";

export const getTeachersList = async () => {
  try {
    const snapshot = await getDocs(collection(db, "teacher"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      first_name: doc.data().first_name,
      last_name: doc.data().last_name,
      yearsTaught: doc.data().year_taught,
    }));
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getStudentsList = async () => {
  try {
    const snapshot = await getDocs(collection(db, "student"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      first_name: doc.data().first_name,
      last_name: doc.data().last_name,
      year: doc.data().year,
    }));
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getClassesList = async () => {
  try {
    const snapshot = await getDocs(collection(db, "class"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      students: doc.data().Students,
      teachers: doc.data().Teachers,
      name: doc.data().name,
      subject: doc.data().subject,
      grade: doc.data().grade,
      grade: doc.data().grade
    }));
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacher = async (teacherID) => {
  try {
    const docRef = doc(db, "teacher", teacherID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`Document '${teacherID}' does not exist`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getStudent = async (studentID) => {
  try {
    const docRef = doc(db, "student", studentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`Document '${studentID}' does not exist`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getClass = async (classID) => {
  try {
    const docRef = doc(db, "class", classID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`Document '${classID}' does not exist`);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createTeacher = async (firstname, lastname, yearsTaught) => {
  try {
    const docRef = await addDoc(collection(db, "teacher"), {
      first_name: firstname,
      last_name: lastname,
      year_taught: yearsTaught,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createStudent = async (firstname, lastname, year) => {
  try {
    const docRef = await addDoc(collection(db, "student"), {
      first_name: firstname,
      last_name: lastname,
      year: year,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createClass = async (name, students, teachers, subject) => {
  try {
    const docRef = await addDoc(collection(db, "class"), {
      name: name,
      Students: students,
      Teachers: teachers,
      subject: subject,
      grade: grade,
    });
  } catch (error) {
    console.error(error);
  }
}

export const updateStudentGrade = async (classID, studentID, grade) => {
  try {
    const classDocRef = doc(db, "class", classID);
    await updateDoc(classDocRef, {
      [`Students.${studentID}`]: grade,
    });
  } catch (error) {
    console.error("Error updating student grade:", error);
  }
};

export const addStudentToClass = async (classID, studentID) => {
  try {
    const classDocRef = doc(db, "class", classID);
    await updateDoc(classDocRef, {
      [`Students.${studentID}`]: null,
    });
  } catch (error) {
    console.error("Error adding student:", error);
  }
}

export const removeStudentFromClass = async (classID, studentID) => {
  try {
    const classDocRef = doc(db, "class", classID);
    const classDocSnap = await getDoc(classDocRef);
    const classData = classDocSnap.data();

    const studentData = classDocSnap.data().Students;
    delete studentData[studentID]

    await updateDoc(classDocRef, {...classData, Students: studentData});

    console.log(`Student with ID ${studentID} has been removed from class ${classID}`);
  } catch (error) {
    console.error("Error removing student:", error);
  }
};

export const addTeacherToClass = async (classID, teacherID) => {
  try {
    const classDocRef = doc(db, "class", classID);
    const classDocSnap = await getDoc(classDocRef);
    const teacherData = classDocSnap.data().Teachers;
    await updateDoc(classDocRef, {
      Teachers: [...teacherData, teacherID],
    });
  } catch (error) {
    console.error("Error adding teacher:", error);
  }
}

export const removeTeacherFromClass = async (classID, teacherID) => {
  try {
    const classDocRef = doc(db, "class", classID);
    const classDocSnap = await getDoc(classDocRef);
    const teacherData = classDocSnap.data().Teachers;
    const updatedTeacherData = teacherData.filter((id) => id !== teacherID);

    await updateDoc(classDocRef, {
      Teachers: updatedTeacherData,
    });

    console.log(`Teacher with ID ${studentID} has been removed from class ${classID}`);
  } catch (error) {
    console.error("Error removing teacher:", error);
  }
};

export const removeTeacher = async (firstName, lastName) => {
  try {
    let id = "";
    const teacherDocs = await getDocs(collection(db, "teacher")); // Await the result of getDocs
    teacherDocs.forEach((doc) => {
      if (doc.data().first_name === firstName && doc.data().last_name === lastName) {
        id = doc.id;
      }
    });
    await deleteDoc(doc(db, 'teacher', id)); // Await the deletion operation
  } catch (error) {
    console.error("Error removing teacher:", error);
  }
}

export const removeStudent = async (firstName, lastName) => {
  try {
    let id = "";
    const studentDocs = await getDocs(collection(db, "student"));
    studentDocs.forEach((doc)=> {
      if (doc.data().first_name === firstName && doc.data().last_name === lastName) {
        id = doc.id;
      }
    });
    // Check if id is not empty before attempting to delete the document
    if (id) {
      await deleteDoc(doc(db, 'student', id));
    } else {
      console.error("Document ID not found for student:", firstName, lastName);
    }
  } catch (error) {
    console.error("Error removing student:", error);
  }
}
