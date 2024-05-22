//Card component for Dashboard
//Displays Class Name and Teacher
import "../routes/dashboard.css"

import React from 'react'

const ClassCard = ({ name, teacher, subject }) => {
    const subject_color = {
        "english": "f0f8ff",
        "math": "#ffb3a6",
        "history": "#c6d993",
        "physics": "#e2c5f0"
    };

    return (
        <>
            <div className="class-card" style={{ backgroundColor: subject_color[subject]}}>
                <h2 className="class-name">{name}</h2>
                <p className="teacher-name">{teacher}</p>
            </div>   
        </>
    )
}

export default ClassCard