import React, { useEffect, useState } from 'react'
import ClassCard from '../components/ClassCard';
import { getClassesList, getTeacher } from '../../database-controller';
import { ClassInfo } from '../components/ClassInfo';

export const Dashboard = () => {
  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
  const [selectedID, setSelectedID] = useState("");
  const [classes, setClasses] = useState([]);

  console.log(selectedID)

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
      {selectedID != "" && 
        <ClassInfo classID={selectedID} />
      }

      {selectedID == "" && grades.map((grade, i) => {
        return (
          <div>
            <h2 className="grade-title">{grade}</h2>
            <div className="classes-group">
              {classes.map((c) => {
                if (c.grade == i + 1)
                  return (
                    <div className="class-item" key={c.id}>
                      <ClassCard
                        classID={c.id}
                        name={c.name}
                        teacherID={c.teachers[0]}
                        subject={c.subject}
                        setSelectedID={setSelectedID}
                      />
                    </div>
                  )
                }
              )}
            </div>
          </div>
        )
        })
      }

    </div>
  )
}


