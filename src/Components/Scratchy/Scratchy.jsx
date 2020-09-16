import React from 'react';
import skin from '../../Images/skin.png';
import WinningNumbers from './WinningNumbers/WinningNumbers.jsx';
import WinningNumbersButtons from './WinningNumbersButtons/WinningNumbersButtons.jsx'
import WinningNumbersButtonsClicked from './WinningNumbersButtonsClicked/WinningNumbersButtonsClicked.jsx'
import YourNumbers from './YourNumbers/YourNumbers.jsx';
import YourNumbersButtons from './YourNumbersButtons/YourNumbersButtons.jsx'
import YourNumbersButtonsClicked from './YourNumbersButtonsClicked/YourNumbersButtonsClicked.jsx'
import PersonalMessage from './PersonalMessage/PersonalMessage.jsx'
import UIfx from 'uifx';
import bwongSound from '../../Sounds/bwongSound.mp3';
import scratchSound from '../../Sounds/scratchSound.mp3';
import mysteryPrizeSound from '../../Sounds/suspense.mp3';
import winSound from '../../Sounds/kids-saying-yay-sound-effect_2.mp3';
import lossSound from '../../Sounds/answer-wrong.mp3';
import dissapointedSound from '../../Sounds/spongebob-fail.mp3'

class Scratchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningNumbers: [
        {number: 40, text: 'FRTY', shape:'e', clickCount: 0, status: 'uncertain'},
        {number: 30, text: 'TRTY', shape:'d', clickCount: 0, status: 'uncertain'},
        {number: 20, text: 'TNTY', shape:'c', clickCount: 0, status: 'uncertain'},
        {number: 9, text: 'NINE', shape:'c', clickCount: 0, status: 'uncertain'},
        {number: 7, text: 'SEVN', shape:'c', clickCount: 0, status: 'uncertain'},
      ],
      winningNumbersClicked: [],
      yourNumbers: [
        [
          {number: 41, text: 'FRON', shape:'c', status: [0, 0, 'uncertain']},
          {number: 33, text: 'TRTR', shape:'d', status: [0, 0, 'uncertain']},
          {number: 28, text: 'TNET', shape:'e', status: [0, 0, 'uncertain']},
          {number: 19, text: 'NNTN', shape:'c', status: [0, 0, 'uncertain']}
        ],
        [
          {number: 23, text: 'TNTR', shape:'e', status: [0, 0, 'uncertain']},
          {number: 12, text: 'TWLV', shape:'d', status: [0, 0, 'uncertain']},
          {number: 8, text: 'EIGH', shape:'e', status: [0, 0, 'uncertain']},
          {number: 27, text: 'TNSV', shape:'c', status: [0, 0, 'uncertain']}
        ],
        [
          {number: 34, text: 'TRFR', shape:'e', status: [0, 0, 'uncertain']},
          {number: 1, text: 'ONE', shape:'d', status: [0, 0, 'uncertain']},
          {number: 48, text: 'FRET', shape:'c', status: [0, 0, 'uncertain']},
          {number: 45, text: 'FRFV', shape:'d', status: [0, 0, 'uncertain']}
        ],
        [
          {number: 16, text: 'SXTN', shape:'e', status: [0, 0, 'uncertain']},
          {number: 25, text: 'TNFV', shape:'d', status: [0, 0, 'uncertain']},
          {number: 26, text: 'TNSX', shape:'c', status: [0, 0, 'uncertain']},
          {number: 36, text: 'TRSX', shape:'e', status: [0, 0, 'uncertain']}
        ],
        [
          {number: 20, text: 'TNTY', shape:'d', status: [0, 0, 'uncertain']},
          {number: 49, text: 'FRNN', shape:'c', status: [0, 0, 'uncertain']},
          {number: 11, text: 'ELVN', shape:'e', status: [0, 0, 'uncertain']},
          {number: 10, text: 'TEN', shape:'c', status: [0, 0, 'uncertain']}
        ],
      ],
      unclaimedPrizes: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
      ],
      uncertainYourNumbersClicked: [],
      uncertainYourNumbersClickedCoordinates: [],
      yourNumbersClicked: []
    }
  }

  handleWinningNumberButtonClick(e, i) {
    let newWinningNumbersClicked = this.state.winningNumbersClicked;
    let newYourNumbers = this.state.yourNumbers;
    let newWinningNumbers = this.state.winningNumbers;
    let coordinates = this.state.uncertainYourNumbersClickedCoordinates;
    let yourNumbersClicked = this.state.yourNumbersClicked;

    const win = new Audio(winSound);
    const loss = new Audio(lossSound)

    if(yourNumbersClicked.length === 20) {
      if(yourNumbersClicked.indexOf(this.state.winningNumbers[i].number) === -1) {
        newWinningNumbersClicked[i].status = 'loss';
        loss.play()
      }
    }

    if(this.state.winningNumbers[i].clickCount < 2) {
      newWinningNumbers[i].clickCount++;

      if(this.state.winningNumbersClicked.indexOf(this.state.winningNumbers[i].number) === -1) {
        newWinningNumbersClicked.push(this.state.winningNumbers[i].number);
      
        for(let i = 0; i < coordinates.length; i++) {
          if(newWinningNumbersClicked.indexOf(newYourNumbers[coordinates[i][0]][coordinates[i][1]].number) !== -1) {
            newYourNumbers[coordinates[i][0]][coordinates[i][1]].status[2] = 'win';  
            newWinningNumbers[i].status = 'win';
            setTimeout(() => {win.play()}, 700);
          }
        }

        if(newWinningNumbersClicked.length === 5) {
          for(let i = 0; i < coordinates.length; i++) {
            if(newWinningNumbersClicked.indexOf(newYourNumbers[coordinates[i][0]][coordinates[i][1]].number) === -1) {
              newYourNumbers[coordinates[i][0]][coordinates[i][1]].status[2] = 'loss'; 
            } else {
              newYourNumbers[coordinates[i][0]][coordinates[i][1]].status[2] = 'win';
              setTimeout(() => {win.play()}, 700);
            }
          }
        }
      }  
  
      this.setState({
        winningNumbers: newWinningNumbers,
        winningNumbersClicked: newWinningNumbersClicked,
        yourNumbers: newYourNumbers
      })
    }

    const scratch = new Audio(scratchSound);
    const bwong = new Audio(bwongSound);
    
    if(this.state.winningNumbers[i].clickCount === 1) {
      scratch.play()
    } else {
      bwong.play();
    }
  }

  handleYourNumberNumberButtonClick(e, i, j) {
    const number = this.state.yourNumbers[i][j].number;
    let numberStatus = this.state.yourNumbers[i][j].status[0];
    let newNumberStatus = numberStatus;
    let prizeStatus = this.state.yourNumbers[i][j].status[1];
    let newPrizeStatus = prizeStatus;
    let gameStatus = this.state.yourNumbers[i][j].status[2];
    let newGameStatus = gameStatus;
    let winningNumbersClicked = this.state.winningNumbersClicked;
    let newUnclaimedPrizes = this.state.unclaimedPrizes;
    let newUncertainYourNumbersClicked = this.state.uncertainYourNumbersClicked;
    let newUncertainYourNumbersClickedCoordinates = this.state.uncertainYourNumbersClickedCoordinates;
    let newYourNumbers = this.state.yourNumbers;
    let newYourNumbersClicked = this.state.yourNumbersClicked;

    const scratch = new Audio(scratchSound);
    const uncertain = new Audio(bwongSound);
    const win = new Audio(winSound);
    const loss = new Audio(lossSound);
    const mysteryPrize = new Audio(mysteryPrizeSound) 
    
    if(numberStatus === 0) {
      newYourNumbersClicked.push(number);
    }

    if(gameStatus === 'uncertain') {
      if(numberStatus === 0 && prizeStatus === 0) {
        newNumberStatus++;
        if(winningNumbersClicked.indexOf(number) >= 0) {
          newGameStatus = 'win';
          newUnclaimedPrizes[i][j] = true;
          scratch.play();
          setTimeout(() => {win.play()}, 700);
        } else if(winningNumbersClicked.length === 5){
          newGameStatus = 'loss';
          console.log('wtf')
          scratch.play();
          setTimeout(() => {loss.play()}, 700);
        } else {
          newUncertainYourNumbersClicked.push(number);
          newUncertainYourNumbersClickedCoordinates.push([i, j]);
          scratch.play();
          console.log(winningNumbersClicked)
          console.log(winningNumbersClicked.length)
          setTimeout(() => {uncertain.play()}, 700);
        }
      } else if(numberStatus === 1 && prizeStatus === 0) {
        newPrizeStatus++;
        mysteryPrize.play();
      } else if(numberStatus === 0 && prizeStatus === 1) {
        newNumberStatus++;
        console.log()
        if(winningNumbersClicked.indexOf(number) >= 0) {
          newGameStatus = 'win';
          newUnclaimedPrizes[i][j] = true;
          win.play();
        } else if(winningNumbersClicked.length === 5){
          newGameStatus = 'loss';
          loss.play();
        } else {
          newUncertainYourNumbersClicked.push(number)
          newUncertainYourNumbersClickedCoordinates.push([i, j])
          uncertain.play();
        }
      } else if(numberStatus === 1 && prizeStatus === 1) {
        newNumberStatus++;
        newPrizeStatus++;
        uncertain.play();
      } else if(numberStatus === 2 && prizeStatus === 2) {
        uncertain.play();
      }
     } else if(gameStatus === 'loss') {
      newNumberStatus = 2;
      newPrizeStatus = 2;
      loss.play();
     } else if(gameStatus === 'win') {
      newNumberStatus = 2;
      newPrizeStatus = 2;
      win.play();
      if(prizeStatus === 2) {
        // TODO OPEN PRIZE SHOWCASE
        alert('OPENING PRIZE SHOWCASE FROM NUMBER BUTTON CLICK')
        newUnclaimedPrizes[i][j] = false;
      }
     }


    newYourNumbers[i][j].status = [newNumberStatus, newPrizeStatus, newGameStatus];

    this.setState({
      yourNumbers: newYourNumbers,
      unclaimedPrizes: newUnclaimedPrizes,
      uncertainYourNumbersClicked: newUncertainYourNumbersClicked,
      uncertainYourNumbersClickedCoordinates: newUncertainYourNumbersClickedCoordinates,
      yourNumbersClicked: newYourNumbersClicked
    })
  }


  handleYourNumberPrizeButtonClick(e, i, j) {
    const number = this.state.yourNumbers[i][j].number;
    let numberStatus = this.state.yourNumbers[i][j].status[0];
    let newNumberStatus = numberStatus;
    let prizeStatus = this.state.yourNumbers[i][j].status[1];
    let newPrizeStatus = prizeStatus;
    let gameStatus = this.state.yourNumbers[i][j].status[2];
    let newGameStatus = gameStatus;
    let newUnclaimedPrizes = this.state.unclaimedPrizes;
    let newYourNumbers = this.state.yourNumbers;

    const scratch = new Audio(scratchSound);
    const uncertain = new Audio(bwongSound);
    const win = new Audio(winSound);
    const loss = new Audio(lossSound);
    const mysteryPrize = new Audio(mysteryPrizeSound) 

    if(gameStatus === 'uncertain') {
      if(numberStatus === 0 && prizeStatus === 0) {
        newPrizeStatus++;
        scratch.play();
        setTimeout(() => {mysteryPrize.play()}, 700);
      } else if(numberStatus === 1 && prizeStatus === 0) {
        newPrizeStatus++;
        mysteryPrize.play();
      } else if(numberStatus === 0 && prizeStatus === 1) {
        // TODO => OPEN PRIZE SHOWCASE
        alert('OPEN PRIZE SHOWCASE')
        mysteryPrize.play();
      } else if(numberStatus === 1 && prizeStatus === 1) {
          newPrizeStatus++;
          newNumberStatus++;
        // TODO => OPEN PRIZE SHOWCASE
        alert('OPEN PRIZE SHOWCASE')
        mysteryPrize.play();
      } else if(numberStatus === 2 && prizeStatus === 2) {
        // TODO => OPEN PRIZE SHOWCASE
        alert('OPEN PRIZE SHOWCASE')
        mysteryPrize.play();
      }
     } else if(gameStatus === 'loss') {
       newPrizeStatus = 2;
       newNumberStatus = 2;
       loss.play();
       if(prizeStatus >= 1) {
         // TODO => OPEN PRIZE SHOWCASE
         alert('OPEN PRIZE SHOWCASE')
       }
     } else if(gameStatus === 'win') {
       newPrizeStatus = 2;
       newNumberStatus = 2;
       win.play();
       console.log(newUnclaimedPrizes)
       if(prizeStatus >= 1) {
           newUnclaimedPrizes[i][j] = false;
           alert('OPEN PRIZE SHOWCASE')
         // TODO => OPEN PRIZE SHOWCASE
       }
     }

    newYourNumbers[i][j].status = [newNumberStatus, newPrizeStatus, newGameStatus];

    this.setState({
      yourNumbers: newYourNumbers,
      unclaimedPrizes: newUnclaimedPrizes,
    })
  }

  render() {
    return (
      <div style={{"position":"absolute","display":"flex", "justifyContent":"Center"}}>
        <img src={skin} alt="Skin" style={{"height": "60%", "width":"60%", "marginTop": "1%", "zIndex":"100"}}/>
        <WinningNumbers 
          winningNumbers={this.state.winningNumbers}
        />
        <WinningNumbersButtons 
          winningNumbers={this.state.winningNumbers}
          handleWinningNumberButtonClick={this.handleWinningNumberButtonClick.bind(this)}
        />
        <WinningNumbersButtonsClicked 
          winningNumbers={this.state.winningNumbers}
        />
        <YourNumbers 
          yourNumbers={this.state.yourNumbers}
        />
        <YourNumbersButtons 
          yourNumbers={this.state.yourNumbers}
          handleYourNumberPrizeButtonClick={this.handleYourNumberPrizeButtonClick.bind(this)}
          handleYourNumberNumberButtonClick={this.handleYourNumberNumberButtonClick.bind(this)}
        />
        <YourNumbersButtonsClicked 
          yourNumbers={this.state.yourNumbers}
        />
        <PersonalMessage />
        <div style={{
          "display":"flex",
          "backgroundColor":"rgb(25, 24, 27)",
          "width":"27.4%",
          "marginTop":"1%"
        }}>
        </div>
      </div>
    )
  }
}

export default Scratchy;