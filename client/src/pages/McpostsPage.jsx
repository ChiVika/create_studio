import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/Posts/Posts';

function McpostsPage({user, user_id}) {


  

  return (
    <div>
      <Posts user={user} user_id={user_id}/>
    </div>
  );
}

export default McpostsPage;