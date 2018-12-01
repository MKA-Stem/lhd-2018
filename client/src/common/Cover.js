import React from "react";
import "./Cover.css";

const Cover = ({ text, spinner }) => (
  <div className="Cover">
    {spinner && (
      <div className="lds-grid">
        {/* Credit to https://loading.io/css/ */}
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    )}
    {text && <div className="text">{text}</div>}
  </div>
);

export default Cover;
