import React from 'react';
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Click here to return home</Link>
    </div>
  );
}

export default NotFound;
