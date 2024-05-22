import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const getTeachersList = async () => {
  try {
    const snapshot = await getDocs(collection(db, "teacher"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      firstname: doc.data().first_name,
      lastname: doc.data().last_name,
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
      firstname: doc.data().first_name,
      lastname: doc.data().last_name,
      year: doc.data().year,
    }));
  } catch (error) {
    console.error(error);
  }
  return data;
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
    });
  } catch (error) {
    console.error(error);
  }
}



