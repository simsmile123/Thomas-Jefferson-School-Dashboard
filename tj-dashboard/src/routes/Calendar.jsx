import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Button from '@mui/material/Button';

const clientId = import.meta.env.VITE_CLIENT_ID;

export function Calendar() {
  const [user, setUser] = useState({}); // Store could do redux or global but I think we don't need to

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  function handleCreateEvent() {
    // Logic to create an event, you may need to use Google Calendar API here
    console.log("Create Event button clicked");
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="Calendar">
      <div id="signInDiv"></div>
      {
        Object.keys(user).length !== 0 &&
        <div>
          <Button variant="contained" color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
          {/* <Button variant="contained" color="secondary" onClick={handleCreateEvent}>
            Create Event?
          </Button> */}
          <div>
            <img src={user.picture} alt="User profile"></img>
            <h3>{user.name}</h3>
          </div>
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${user.email}&ctz=America/Los_Angeles`}
            style={{ border: 0 }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
            title="Google Calendar"
          ></iframe>
        </div>
      }
    </div>
  );
}

// export default Calendar;
