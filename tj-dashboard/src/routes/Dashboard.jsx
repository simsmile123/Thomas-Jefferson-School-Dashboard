import React, { useEffect, useState } from 'react'
import ClassCard from '../components/ClassCard';
import { getClassesList } from '../../database-controller';

export const Dashboard = () => {
  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
  const [selectedID, setSelectedID] = useState("");
  const [classes, setClasses] = useState([]);
  // const classes = [];

  useEffect(() => {
    const fetchData = async () => {
      setClasses(await getClassesList());
      console.log(classes);
    }
    fetchData();
  }, []);

  return (
    <div id="main-container">
      <h1 id="dashboard-header">Dashboard</h1>
      
      {classes && classes.map((c) => (
          <div key={c.id}>
            <ClassCard name={c["name"]} teacher={c.teachers} subject={c.subject} />
          </div>
        ))
      }

{/* 
      <h2>Grade 1</h2>
      <ClassCard name="Math1" teacher="SOMAS, PYTHAGORAS" subject="math"/>
      <h2>Grade 2</h2>
      <ClassCard name="English2" teacher="FITZERALD, F. SCOTT" subject="english"/>
      <ClassCard name="History2" teacher="COLUMBUS, CHRISTOPHER" subject="history"/>
      <h2>Grade 3</h2>
      <ClassCard name="Math3" teacher="SOMAS, PYTHAGORAS" subject="math"/>
      <h2>Grade 4</h2>
      <ClassCard name="History3" teacher="JEFFERSON, THOMAS" subject="history"/>
      <h2>Grade 5</h2>
      <ClassCard name="Physics5" teacher="NEWTON, ISAAC" subject="physics"/> */}
    </div>
  )
}


