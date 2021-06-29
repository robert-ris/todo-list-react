import React from 'react';
import style from './style.css';

const header = () => {
  return (
    <div className="header">
      <h2 style={{margin: "5px"}}>My To To List</h2>
      <input type="text" placeholder="Title..." />
      <span className="addBtn">Add</span>
    </div>
  );
};

export default header;