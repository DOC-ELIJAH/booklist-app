import React, { useEffect } from "react";

const Message = ({ type, msg, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Message;
