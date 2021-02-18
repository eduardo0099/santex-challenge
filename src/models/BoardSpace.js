export const BOARD_SPACE_STATUS = {
  HEALTHY: 'boardgame__cell--healthy',
  DAMAGED: 'boardgame__cell--damaged',
  SUNK: 'boardgame__cell--sunk',
  EMPTY: 'boardgame__cell--empty',
}

export class BoardSpace {
  constructor(status = BOARD_SPACE_STATUS.HEALTHY) {
    this.status = status;
    this.shipPositions = null;
  }

  setOtherParts = (partsPositions) => {
    this.shipPositions = partsPositions;
  }

  handleShot = () => {
    const { shipPositions, status } = this;

    if ([BOARD_SPACE_STATUS.SUNK, BOARD_SPACE_STATUS.EMPTY].includes(status)) {
      return false;
    }

    if (!shipPositions) {
      this.status = BOARD_SPACE_STATUS.EMPTY;
      return false;
    } else if (status === BOARD_SPACE_STATUS.HEALTHY) {
      this.status = BOARD_SPACE_STATUS.DAMAGED;
      return true;
    }
  }

  isHealtly = () => {
    return this.status === BOARD_SPACE_STATUS.HEALTHY;
  }

  sinkArea = () => {
    this.status = BOARD_SPACE_STATUS.SUNK;
  }
}