import { Link, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from "../components/Profile/Profile";


function ProfileUser({user}) {


    return (
      <>
          <Profile/>
          
      </>
    )
  }
  export default ProfileUser;