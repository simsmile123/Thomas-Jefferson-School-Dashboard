import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./announcements.css"

const Announcements = () => {
    return (
        <div id="announcements-container">
            <h2 id="announcement-title">Announcements</h2>
                <div className="event-card-container">
                    <div className="event-card">
                        <h4>Boys Basketball Game vs. United Kingdom Elementary at Washington Gym</h4>
                        <p>May 25, 2024 6:00PM - 8:00 PM</p>
                        <Button className="page-button" component={Link} to="/calendar">
                        See in Calendar
                        </Button>
                    </div>
                    <div className="event-card">
                        <h4>Annual Can Drive for Independence Chapel</h4>
                        <p>May 26, 2024 8:00AM - 4:00 PM</p>
                        <Button className="page-button" component={Link} to="/calendar">
                        See in Calendar
                        </Button>
                    </div>
                    <div className="event-card">
                        <h4>Pioneer Day</h4>
                        <p>May 28, 2024 9:00AM - 3:00 PM</p>
                        <Button className="page-button" component={Link} to="/calendar">
                        See in Calendar
                        </Button>
                    </div>
                    <div className="event-card">
                        <h4>Girls Tennis Match vs. King George Elementary at Washington Gym</h4>
                        <p>May 28, 2024 9:00AM - 3:00 PM</p>
                        <Button className="page-button" component={Link} to="/calendar">
                        See in Calendar
                        </Button>
                    </div>
                
                    <Button className="page-button" component={Link} to="/calendar" variant='contained'>
                        Add An Event to Calendar
                    </Button>
            </div>
          </div>
  )
}

export default Announcements