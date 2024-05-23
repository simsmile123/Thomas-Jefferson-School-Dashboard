import React from 'react'

import { Link } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Button } from '@mui/material';

const QuickLinks = () => {
  return (
    <div id="quick-links">
        <h2>Quick Links</h2>
        <Button className="page-button" component={Link} to="/dashboard">
            <SummarizeIcon />
            See Class Dashboard
        </Button>
        <Button className="page-button" component={Link} to="/calendar">
            <CalendarMonthIcon />
            View School Calendar
        </Button>
        <Button className="page-button" component={Link} to="/directory">
            <SearchIcon />
            Search Directory
        </Button>
    </div>
  )
}

export default QuickLinks