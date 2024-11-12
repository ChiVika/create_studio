import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/Posts/Posts';

function McpostsPage() {


  return (
    <div>
      <Posts/>
    </div>
  );
}

export default McpostsPage;