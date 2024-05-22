import { Box } from "@mui/material";
import React from "react";
import * as dbc from '../../database-controller';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const ClassInfo = () => {
  const { className } = useParams();

  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersData = await dbc.getClass("I99sXFrMAw5qPXl3UuVq");
      console.log(teachersData);
    };
    fetchTeachers();
  }, []);

  return (
    <Box>
      <h1>Class Detail</h1>
      <p>Class Name: {className}</p>
      <h2>Teachers:</h2>
    </Box>
  );
};
