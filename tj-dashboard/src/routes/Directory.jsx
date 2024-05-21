import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";


export const Directory = () => {
  const [filter1, setFilter1] = useState("")
  const [filter2, setFilter2] = useState("")
  const [query, setQuery] = useState([])

  useEffect(() => {
    // TODO: make change to database
    const getQuery = async () => {
      const results = []
      // student directory
      if (filter1 === "Student") {
          await getDocs(collection(db, "student"))
            .then((allDocs) => {
              allDocs.forEach((doc) => {
                results.push({ first_name: doc.data().first_name, 
                                 last_name: doc.data().last_name, 
                                 grade: doc.data().year, 
                                 class: doc.data().classes
                              });
              })});
      }
      // teacher directory
      else if (filter1 === "Teacher") {
        await getDocs(collection(db, "teacher"))
            .then((allDocs) => {
              allDocs.forEach((doc) => {
                results.push({ first_name: doc.data().first_name, 
                                last_name: doc.data().last_name, 
                                grade: doc.data().year_taught, 
                                class: doc.data().classes
                              });
              })});
      }
      setQuery(results);
    }
    getQuery();
  },[filter1])


  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "filter1") {
      setFilter1(value);
    } 
    else if (id === "filter2") {
      setFilter2(value);
    }
  }

  return (
    <>
      <div>
        <h1>Search the Directory</h1>
        <label>Filter by: </label>
        <select id="filter1" onChange={handleChange}>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        </select>

        <select id="filter2" onChange={handleChange}>
        <option value="grade">Grade</option>
        <option value="class">Class</option>
        </select>
      </div>

      <div>
      <ul>
        {query.length === 0 ? (
          <p>Loading...</p>
        ) : (
          query.map((item, index) => (
            <li key={index}>
              {item.first_name} {item.last_name}
              <div>
                {filter2 === "Grade" ? (
                  <p>This is Grade: {item.grade}</p>
                ) : (
                  <p>This is Class: {item.class}</p>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
    </>

  )
}


