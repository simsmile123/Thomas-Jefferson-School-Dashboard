import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import './Directory.css';
export const Directory = () => {
  const [filter1, setFilter1] = useState("teacher");
  const [filter2, setFilter2] = useState("grade");
  const [query, setQuery] = useState([]);
  const [user, setUser] = useState("");
  const [flag, setFlag] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getQuery = async () => {
      const results = [];
      console.log("Fetching data for filter1:", filter1);

      if (filter1 === "student") {
        try {
          const allDocs = await getDocs(collection(db, 'student'));
          console.log("Student documents fetched:", allDocs.size);
          allDocs.forEach((doc) => {
            results.push({
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              grade: doc.data().year,
              class: doc.data().classes
            });
          });
        } catch (error) {
          console.error("Error retrieving student documents: ", error);
        }
      } 
      else if (filter1 === "teacher") {
        try {
          const allDocs = await getDocs(collection(db, "teacher"));
          allDocs.forEach((doc) => {
            results.push({
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              grade: doc.data().year_taught,
              class: doc.data().classes
            });
          });
        } catch (error) {
          console.error("Error retrieving teacher documents: ", error);
        }
      }    
      setQuery(results);
    };
    setFlag(false);
    getQuery();
  }, [filter1]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "filter1") {
      setFilter1(value);
    } 
    else if (id === "filter2") {
      setFilter2(value);
    }
  };

  const handleUser = (e) => {
    setUser(e.target.value.trim());
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const getUserInfo = async () => {
      // remove white space
      const [firstName, lastName] = user.split(" ").map(str => str.trim());

      const temp = [];
      if (filter1 === 'student') {
        const stuDocs = await getDocs(collection(db, "student"));
        stuDocs.forEach((doc) => {
        const data = doc.data();
          if (data.first_name === firstName && data.last_name === lastName) {
            temp.push(data);
          }
        });
      } 
      else {
        const teaDocs = await getDocs(collection(db, "teacher"));
        teaDocs.forEach((doc) => {
          const data = doc.data();
          if (data.first_name === firstName && data.last_name === lastName) {
            temp.push(data);
          }
        });
      }
      setUserInfo(temp[0]);
    };
    await getUserInfo();
    setFlag(true);
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

        <form id="user-specific">
          <label>Type in a name (first and last)...</label>
          <input type="text" onChange={handleUser}/>
          <button type="submit" onClick={handleClick}>Submit</button>
        </form>
      </div>
      
      <div>
        
          {query.length === 0 ? (
            <p>Loading...</p>
          ) : flag === false ? (
            query.map((item, index) => (
              <li key={index}>
                {item.first_name} {item.last_name}
                <div>
                  <ol>
                  {filter2 === "grade" ? (
                    Array.isArray(item.grade) ? (
                      item.grade.map((gradeItem, gradeIndex) => (
                        <li key={gradeIndex}>
                          <p>{gradeItem}</p>  
                        </li>
                      ))
                    ) : (
                      <p> {item.grade}</p>
                    )
                  ) : (
                    Array.isArray(item.class) ? (
                      item.class.map((classItem, classIndex) => (
                        <li key={classIndex}>
                          <p>{classItem}</p>  
                        </li>
                      ))
                    ) : (
                      <p> {item.class}</p>
                    )
                  )}
                  </ol>
                </div>
              </li>
            )) 
          ) : ( 
            // specific user query
            <div>
              <p>{userInfo.first_name} {userInfo.last_name}</p>
              <div>
                <ol>
                {filter2 === "grade" ? (
                  Array.isArray(userInfo.year_taught) ? (
                    userInfo.year_taught.map((gradeItem, gradeIndex) => (
                      <li key={gradeIndex}>
                        <p>{gradeItem}</p>  
                      </li>
                    ))
                  ) : (
                    <li>
                      {filter1 === "student" ? (
                        <p>{userInfo.year}</p>
                      ) : (
                        <p>{userInfo.year_taught}</p>
                      )}
                    </li>
                  )
                ) : (
                  Array.isArray(userInfo.classes) ? (
                    userInfo.classes.map((classItem, classIndex) => (
                      <li key={classIndex}>
                        <p>{classItem}</p>  
                      </li>
                    ))
                  ) : (
                    <p> {userInfo.classes}</p>
                  )
                )}
                </ol>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Directory;
