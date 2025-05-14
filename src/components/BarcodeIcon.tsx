import React from "react";

const BarcodeIcon = ({ selected }: { selected: boolean }) => {
  const color = selected ? "#208D4E" : "#000";

  return (
    <svg width="40" height="40" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M34.5556 4H10.1111C8.49034 4 6.93596 4.64385 5.7899 5.7899C4.64385 6.93596 4 8.49034 4 10.1111V34.5556M34.5556 114H10.1111C8.49034 114 6.93596 113.356 5.7899 112.21C4.64385 111.064 4 109.51 4 107.889V83.4444M83.4444 114H107.889C109.51 114 111.064 113.356 112.21 112.21C113.356 111.064 114 109.51 114 107.889V83.4444M83.4444 4H107.889C109.51 4 111.064 4.64385 112.21 5.7899C113.356 6.93596 114 8.49034 114 10.1111V34.5556M59 34.5556V83.4444M83.4444 34.5556V83.4444M34.5556 34.5556V83.4444"
        
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BarcodeIcon;
