import { Box } from "@mui/material";
import React from "react";
import { db } from "../../firebase.js";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export const ClassInfo = () => {
  const { className } = useParams();


  return (
    <Box>
<h1>Class Detail</h1>
      <p>Class Name: {className}</p>
    </Box>

  );
};
