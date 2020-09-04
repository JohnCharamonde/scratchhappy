import React from 'react';
import skin from './skin.png';
import WinningNumbers from './WinningNumbers.jsx';
import YourNumbers from './YourNumbers.jsx';

function Scratchy() {
  return (
    <div style={{"display":"flex", "justifyContent":"Center"}}>
      <img src={skin} alt="Skin" style={{"height": "60%", "width":"60%", "marginTop": "1%"}}/>
        <WinningNumbers />
        <YourNumbers />
      <div style={{"display":"flex", "backgroundColor": "rgb(25, 24, 27)", "width":"27.4%", "marginTop":"1%"}}></div>
    </div>
  )
}

export default Scratchy;