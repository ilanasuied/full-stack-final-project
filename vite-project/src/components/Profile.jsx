import React from 'react'
import NavbarFirst from '../components/NavbarFirst';
import User from './User';
const Profile = () => {
  return (
    <div> 
      <NavbarFirst/>
      <div>
        <User />
      </div>
    </div>
  )
}

export default Profile;
