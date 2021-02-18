import React, { useEffect, useState } from "react";
import { ContentWrapper } from '@components/contentWrapper';
import { formatTimeinSecUntilNow } from '@helpers/functions';
import './stats.scss';

const Stats = ({usedTurns, allowedTurns, sunkShips, totalShips, successShots, startGameTimestamp, gameFinished}) => {
  const [strTime, setStrTime] = useState("0 sec");

  const calculateTimePlaying = () => {
    if (gameFinished) return;
    if (!startGameTimestamp) {
      setStrTime('0 Sec');
    } else {
      const { hours, minutes, seconds } = formatTimeinSecUntilNow(startGameTimestamp);
      const timeTxt = `${hours ? hours + ' Hrs' : ''} ${minutes ? minutes + ' Min' : ''} ${seconds ? seconds + ' Sec' : ''}`;
      setStrTime(timeTxt);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimePlaying(startGameTimestamp);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <ContentWrapper className="stats">
      <div className="stats__var">
          Sunk ships:
          <span className="stats__value">{`${sunkShips}/${totalShips}`}</span>
      </div>
      <div className="stats__var">
          Turns:
          <span className="stats__value">{`${usedTurns}/${allowedTurns}`}</span>
      </div>
      <div className="stats__var">
          Accuracy:
          <span className="stats__value">{`${Math.floor(successShots/usedTurns * 100) || "0"}%`}</span>
      </div>
      <div className="stats__var">
          Time played:
          <span className="stats__value">{strTime}</span>
      </div>
    </ContentWrapper>
  );
};
export default Stats;