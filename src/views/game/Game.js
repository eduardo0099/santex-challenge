import React from 'react';
import { Board } from '@views/game/board';
import { Stats } from '@views/game/stats';
import BattleshipBoard from '@models/BattleshipBoard';
import { Header } from '@components/header';
import { connect } from 'react-redux';
import { routes } from '@config/routes';
import { setModalText, setButtonCallback } from '@redux/confirmationModal/confirmationModal.actions';
import { ContentWrapper } from '@components/contentWrapper';
import './game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new BattleshipBoard();
    this.state = {
      board: board.initialize(),
      initGameTimestamp: null,
      gameFinished: false,
    };
  }

  handleChangeConfig = (maxTurns, turnsUnlimited) => {
    this.setState({maxTurns, turnsUnlimited});
  }

  handleClickSpace = (e) => {
    e.preventDefault();
    const position = parseInt(e.target.dataset.position, 10);
    this.setState((state) => ({
      board: state.board.shootSpace(position)
    }), () => {
      this.setTimestampFirstMove();
      this.endGame();
    });
  }

  resetGame = () => {
    const newBoard = new BattleshipBoard();
    this.setState({
      board: newBoard.initialize(),
      initGameTimestamp: null,
      gameFinished: false,
    });
  }

  endGame = () => {
    const {turnsUnlimited, nTurns} = this.props;
    const { board } = this.state;
    if (
      board.totalShips === board.sunkShips
      && (turnsUnlimited || nTurns >= board.revealedSpaces)
    ) {
      this.setState({gameFinished: true});
      this.props.setConfirmationModalText(
        `Congrats! You won in ${board.revealedSpaces} turns. Try again to beat your score.`
      );
      this.props.setButtonCallback(this.resetGame);
    } else if (
      board.totalShips > board.sunkShips
      && !turnsUnlimited
      && nTurns === board.revealedSpaces
    ) {
      this.setState({gameFinished: true});
      this.props.setConfirmationModalText(
        `Oh no! You lost :( Try again to beat your score.`
      );
      this.props.setButtonCallback(this.resetGame);
    }
  }

  setTimestampFirstMove = () => {
    if (this.state.board.revealedSpaces === 1) {
      this.setState({initGameTimestamp: new Date().getTime()});
    }
  }

  gameReadyToPlay = () => {
    const {turnsUnlimited, nTurns} = this.props;
    return (nTurns > 0 || turnsUnlimited);
  }

  render() {
    const {turnsUnlimited, nTurns, history} = this.props;
    const { board, initGameTimestamp, gameFinished } = this.state;
    if (!this.gameReadyToPlay()) {
      history.push(routes.HOME);
      return null;
    }
    return (
      <div className="game">
        <Header></Header>
        <div className="game__board-wrapper">
          <Stats
            usedTurns={board.revealedSpaces}
            allowedTurns={turnsUnlimited ? 'Unlimited' : nTurns}
            sunkShips={board.sunkShips}
            totalShips={board.totalShips}
            successShots={board.successShots}
            startGameTimestamp={initGameTimestamp}
            gameFinished={gameFinished}
          ></Stats>
          <ContentWrapper className="game__grid-wrapper">
            <Board board={this.state.board} onClickSpace={this.handleClickSpace}/>
          </ContentWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nTurns: state.gameConfig.nTurns,
    turnsUnlimited: state.gameConfig.turnsUnlimited,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setConfirmationModalText: (text) => dispatch(setModalText(text)),
    setButtonCallback: (func) => dispatch(setButtonCallback(func)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);