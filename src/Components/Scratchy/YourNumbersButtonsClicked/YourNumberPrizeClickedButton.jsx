import React from 'react';
import prize from '../../../Images/prize.png';

function YourNumberPrizeButtonClicked(props) {
  const opacity = props.clickCount === 1 ? "1" : "-";
  return (
    <div style={{
    "display":"flex",
    "justifyContent":"center",
    "alignItems":"flex-start",
    "height":"50%",
    "width":"100%",
    }}
    >
      <img src={prize} alt="Prize" style={{"height":"70%", "opacity":opacity}} />
    </div>
  )
}

export default YourNumberPrizeButtonClicked;