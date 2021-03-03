import React, { useEffect } from "react";

const Message = ({ type, msg, removeAlert, books }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [books]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Message;
