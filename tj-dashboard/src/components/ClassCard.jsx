//Card component for Dashboard
//Displays Class Name and Teacher
import { getTeacher } from "../../database-controller";
import "../routes/dashboard.css"

import React, { useEffect, useState } from 'react'

const ClassCard = ({ classID, name, teacherID, subject, setSelectedID }) => {
    const [teacherName, setTeacherName] = useState("");

    useEffect(() => {
        const getName = async (teacherID) => {
            const data = await getTeacher(teacherID);
            const name = data.last_name.toUpperCase() + ", " + data.first_name.toUpperCase();
            console.log(name)
            setTeacherName(name);
        }
        getName(teacherID);
    }, []);

    const subject_color = {
        "english": "f0f8ff",
        "math": "#ffb3a6",
        "history": "#c6d993",
        "physics": "#e2c5f0"
    };

    return (
        <>
            <button className="card-button-wrapper" onClick={() => setSelectedID(classID)}>
                <div className="class-card" style={{ backgroundColor: subject_color[subject] }}>
                    <h2 className="class-name">{name}</h2>
                    <p className="teacher-name">{teacherName}</p>
                </div>   
            </button>
        </>
    )
}

export default ClassCard