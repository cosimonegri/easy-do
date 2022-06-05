import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  const reference = useRef(null);

  useEffect(() => {
    reference.current.click();
  }, []);

  return (
    <div>
      <Link to="/" className="link" ref={reference} />
    </div>
  );
};
