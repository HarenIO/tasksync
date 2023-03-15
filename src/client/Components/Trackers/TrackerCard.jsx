import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrackerCard({ tracker }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tracker/${tracker.tracker_id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
      }}
    >
      {tracker.name}
    </div>
  );
}

export default TrackerCard;
