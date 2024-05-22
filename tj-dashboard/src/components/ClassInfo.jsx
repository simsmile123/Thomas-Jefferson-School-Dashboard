import { Box, Typography } from "@mui/material";
import React from "react";
import * as dbc from '../../database-controller';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const ClassInfo = () => {
  const [classInfo, setClassInfo] = useState({});
  const classID = "I99sXFrMAw5qPXl3UuVq"
  useEffect(() => {
    const fetchClassInfo = async () => {
      const classInfoData = await dbc.getClass(classID);
      console.log(classInfoData);
      setClassInfo(classInfoData);
    };
    fetchTeachers();
  }, []);

  return (
    <Box>
      <Typography></Typography>
    </Box>
  );
};
