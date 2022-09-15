import React, { useState } from "react";

const HoverIcon = ({ icon, hoverIcon, onClickFunction }) => {
  const iconSize = 20;
  const [currentIcon, setCurrentIcon] = useState(icon);

  return (
    <button
      type="button"
      onClick={onClickFunction}
      onMouseOver={() => setCurrentIcon(hoverIcon)}
      onMouseLeave={() => setCurrentIcon(icon)}
    >
      <img src={currentIcon} width={iconSize} height={iconSize} alt="" />
    </button>
  );
};

export default HoverIcon;
