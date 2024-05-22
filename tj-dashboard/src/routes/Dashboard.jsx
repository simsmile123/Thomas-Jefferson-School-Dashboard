import React from 'react'
import ClassCard from '../components/ClassCard';

export const Dashboard = () => {
  const grades = ["Kidergarden", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];

  return (
    <div id="main-container">
      <h1 id="dashboard-header">Dashboard</h1>
      <h2>Kindergarden</h2>
      <ClassCard name="EnglishK" teacher="WOLF, VIRGINIA" subject="english"/>
      <h2>Grade 1</h2>
      <ClassCard name="Math1" teacher="SOMAS, PYTHAGORAS" subject="math"/>
      <h2>Grade 2</h2>
      <ClassCard name="English2" teacher="FITZERALD, F. SCOTT" subject="english"/>
      <h2>Grade 3</h2>
      <ClassCard name="Math3" teacher="SOMAS, PYTHAGORAS" subject="math"/>
      <h2>Grade 4</h2>
      <ClassCard name="History3" teacher="JEFFERSON, THOMAS" subject="history"/>
      <h2>Grade 5</h2>
      <ClassCard name="Physics5" teacher="NEWTON, ISAAC" subject="physics"/>
    </div>
  )
}


