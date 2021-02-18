import React, { useState } from 'react';
import { Button } from '@components/button';
import { TURNS_X_LEVEL } from '@config/constants';
import { ContentWrapper } from '@components/contentWrapper';
import { Input } from '@components/input';
import { setGameConfig } from '@redux/gameConfig/gameConfig.actions';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { routes } from '@config/routes';
import './configPanel.scss';

const BUTTON_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  CUSTOM: 'Custom',
}

const ConfigPanel = (props) => {
  const [btnSelected, setBtnSelected] = useState(null);
  const history = useHistory();

  const handleEasyConfig = () => {
    setBtnSelected(BUTTON_LEVELS.EASY);
    props.setGameConfig(TURNS_X_LEVEL.EASY, true);
  }

  const handleMediumConfig = () => {
    setBtnSelected(BUTTON_LEVELS.MEDIUM);
    props.setGameConfig(TURNS_X_LEVEL.MEDIUM, false);
  }

  const handleHardConfig = () => {
    setBtnSelected(BUTTON_LEVELS.HARD);
    props.setGameConfig(TURNS_X_LEVEL.HARD, false);
  }

  const handleCustomConfig = () => {
    setBtnSelected(BUTTON_LEVELS.CUSTOM);
    props.setGameConfig(0, false);
  }

  const handleCustomTurns = (e) => {
    const text = e.target.value;
    if (text) {
      props.setGameConfig(parseInt(text, 10), false);
    } else {
      props.setGameConfig(0, false);
    }
  }

  const handleStartButton = () => {
    const { nTurns, turnsUnlimited} = props;
    if (nTurns > 0 || turnsUnlimited) {
      history.push(routes.GAME);
    }
  }

  return (
    <ContentWrapper className="config">
      <div className="config--difficulty-title">Set difficulty</div>
      <div className="config--difficulty">
        <Button className="config--button" onClick={handleEasyConfig}>{BUTTON_LEVELS.EASY}</Button>
        <Button className="config--button" onClick={handleMediumConfig}>{BUTTON_LEVELS.MEDIUM}</Button>
        <Button className="config--button" onClick={handleHardConfig}>{BUTTON_LEVELS.HARD}</Button>
        <Button className="config--button" onClick={handleCustomConfig}>{BUTTON_LEVELS.CUSTOM}</Button>
        {
          btnSelected === 'Custom' ? <Input className="config--custom-input" type="number" onChange={handleCustomTurns} placeholder="Place custom Nº turns"></Input> : null
        }
        {
          btnSelected ? <Button className="config--start-button" onClick={handleStartButton}>Start game - {btnSelected}</Button> : null
        }
      </div>
    </ContentWrapper>
  );
};

const mapStateToProps = state => {
  return {
    nTurns: state.gameConfig.nTurns,
    turnsUnlimited: state.gameConfig.turnsUnlimited,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGameConfig: (nTurns, flagUnlimited) => dispatch(setGameConfig(nTurns, flagUnlimited)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel);