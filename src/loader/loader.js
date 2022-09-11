import React from "react";
import './loader.css';

export default function LoadingSpinner(props) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        <div className="responseMessage">{props.message}</div>
      </div>
    </div>
  );
}