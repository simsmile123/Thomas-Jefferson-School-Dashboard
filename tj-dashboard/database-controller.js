import { db } from './firebase.js'
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const getTeachers = async () => {
    const getCollectionData = async () => {
        const snapshot = await getDocs(collection(db, "teacher"));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
        }));
        console.log(data);
      };
      return await getCollectionData();
};