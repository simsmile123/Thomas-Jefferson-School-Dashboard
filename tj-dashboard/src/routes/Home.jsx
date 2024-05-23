import React from 'react'
import Announcements from '../components/Announcements';
import QuickLinks from '../components/QuickLinks';
 
 export const Home = () => {
   return (
     <>
       <div className="page-container">
          <h1>Welcome to Thomas Jefferson Elementary School</h1>
          <Announcements />
          <QuickLinks />
       </div>
     </>
   )
 }
 

 