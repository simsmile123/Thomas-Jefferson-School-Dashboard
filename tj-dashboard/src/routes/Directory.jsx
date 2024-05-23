import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { createStudent, createTeacher, removeTeacher, removeStudent } from "../../database-controller";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LinearProgress from '@mui/material/LinearProgress';

export const Directory = () => {
  const [filter1, setFilter1] = useState("teacher");
  const [filter2, setFilter2] = useState("grade");
  const [query, setQuery] = useState([]);
  const [user, setUser] = useState("");
  const [flag, setFlag] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const [firstChange, setFirstChange] = useState("");
  const [lastChange, setLastChange] = useState("");

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


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "role") {
      setFilter1(value);
    } else if (name === "attribute") {
      setFilter2(value);
    }
  };
  

  const handleUser = (e) => {
    setUser(e.target.value.trim());
  }

  const handleChangeUser = (e) => {
    if (e.target.id === "first") {
      setFirstChange(e.target.value);
    }
    else {
      setLastChange(e.target.value);
    }
    console.log(firstChange);
    console.log(lastChange);
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


  const handleAddDelete = async (e) => {
    e.preventDefault();
    const id = e.target.id;

    if (id === "add") {
      if (filter1 === "student") {
        createStudent(firstChange, lastChange, null);
      }
      else {
        createTeacher(firstChange, lastChange, null);
      }
    }
    else if (id === "delete") {
      if (filter1 === "student") {
        removeStudent(firstChange, lastChange);
      }
      else {
        removeTeacher(firstChange, lastChange);
      }
    }
  }


  return (
    <>
    <Box sx={{ marginTop: '-5px' }}>
      <div>
        <h1>Search the Directory</h1> <br></br>
        <label style={{ fontSize: '18px' }}>Filter by: </label> <br></br><br></br>
        {/* Filter selection */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ width: 150}}>
            <FormControl fullWidth>
              <InputLabel>Roles</InputLabel>
              <Select
                name="role"
                defaultValue="teacher"
                onChange={handleChange}
              >
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: 150 }}>
            <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <Select
                name="attribute"
                defaultValue="grade"
                onChange={handleChange}
              >
                <MenuItem value="grade">Grade</MenuItem>
                <MenuItem value="class">Class</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* User query submit */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box           
            sx={{
              '& > :not(style)': { m: 1, width: '40ch' },
            }}>
            <TextField onChange={handleUser}
            label="Type in a name (first and last)..."
            variant="standard"
          />
          </Box>
          <Button sx={{ width: 100, height: 40, marginTop: '18px'}}
          variant="contained" endIcon={<SendIcon />} type="submit" onClick={handleClick}>Search</Button>
          
        </Box>
      </div>
      
      <div>
        {query.length === 0 ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : flag === false ? (
          <Box sx={{ display: 'block', gap: 2 }}>
            {query.map((item, index) => (
              <Box sx={{ display: 'flex', gap: 10, border: '1px solid grey', bgcolor: '#f0f0f0', marginBottom: 1.5, justifyContent: 'space-between'}}>
                <div>
                  <p>{item.first_name} {item.last_name}</p>
                </div>
                <div>
                <Box key={index} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                    {filter2 === "grade" ? (
                      Array.isArray(item.grade) ? (
                        item.grade.map((gradeItem, gradeIndex) => (
                          <Box>
                          <p key={gradeIndex}>{gradeItem}</p>
                          </Box>
                        ))
                      ) : (
                          <p>{item.grade}</p>
                      )
                    ) : (
                      Array.isArray(item.class) ? (
                        item.class.map((classItem, classIndex) => (
                          <p key={classIndex}>{classItem}</p> 
                        ))
                      ) : (
                          <p>{item.class}</p>
                      )
                    )}
                    </Box>
                </div>
              </Box>
            ))}
          </Box>
        ) : (
          // specific user query
        <Box sx={{ display: 'block', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 10, border: '1px solid grey', bgcolor: '#f0f0f0', marginBottom: 1.5, justifyContent: 'space-between'}}>
              <p>{userInfo.first_name} {userInfo.last_name}</p>
              <div>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                  {filter2 === "grade" ? (
                    Array.isArray(userInfo.year_taught) ? (
                      userInfo.year_taught.map((gradeItem, gradeIndex) => (
                        <Box key={gradeIndex}>
                          <p>{gradeItem}</p>
                        </Box>
                      ))
                    ) : (
                      filter1 === "student" ? (
                        <p>{userInfo.year}</p>
                      ) : (
                        <p>{userInfo.year_taught}</p>
                      )
                    )
                  ) : (
                    Array.isArray(userInfo.classes) ? (
                      userInfo.classes.map((classItem, classIndex) => (
                        <p key={classIndex}>{classItem}</p>
                      ))
                    ) : (
                      <p>{userInfo.classes}</p>
                    )
                  )}
                </Box>
              </div>
            </Box>
        </Box>
        )}
      </div>
      </Box>

      {filter1 === "student" ? (
        <Box sx={{ display: 'flex', gap: 2}}> 
          <Box
          sx={{
            '& > :not(style)': { m: 1, width: '20ch' },
          }}>
          <FormControl fullWidth>
          <TextField onChange={handleChangeUser}
            id="first"
            label="Enter first name"
            variant="standard"
          />
          <TextField onChange={handleChangeUser}
            id="last"
            label="Enter last name"
            variant="standard"
          />
          <Button id="add" onClick={handleAddDelete}>Add Student</Button>
          </FormControl>
          </Box>
        
          <Box
          sx={{
            '& > :not(style)': { m: 1, width: '20ch' },
          }}>
          <FormControl fullWidth>
          <TextField onChange={handleChangeUser}
            id="first"
            label="Enter first name"
            variant="standard"
          />
          <TextField onChange={handleChangeUser}
          id="last"
            label="Enter last name"
            variant="standard"
          />
          <Button id="delete" onClick={handleAddDelete}>Remove Student</Button>
          </FormControl>
          </Box>
        </Box>
      ) : (
        <div>
        <Box sx={{ display: 'flex', gap: 2}}> 
          <Box
          sx={{
            '& > :not(style)': { m: 1, width: '20ch' },
          }}>
          <FormControl fullWidth>
          <TextField onChange={handleChangeUser}
          id="first"
            label="Enter first name"
            variant="standard"
          />
          <TextField onChange={handleChangeUser}
          id="last"
            label="Enter last name"
            variant="standard"
          />
          <Button id="add" onClick={handleAddDelete}>Add Teacher</Button>
          </FormControl>
          </Box>
        
          <Box
          sx={{
            '& > :not(style)': { m: 1, width: '20ch' },
          }}>
          <FormControl fullWidth>
          <TextField onChange={handleChangeUser}
          id="first"
            label="Enter first name"
            variant="standard"
          />
          <TextField onChange={handleChangeUser}
          id="last"
            label="Enter last name"
            variant="standard"
          />
          <Button id="delete" onClick={handleAddDelete}>Remove Teacher</Button>
          </FormControl>
          </Box>
        </Box>
        </div>
      )}

    </>
  );
};

export default Directory;