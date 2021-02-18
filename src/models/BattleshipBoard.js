import { randomNumber } from '@helpers/functions';
import { BoardSpace, BOARD_SPACE_STATUS } from '@models/BoardSpace';
import sound from '@helpers/sound';

const SHIP_DIRECTION = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
};

class BattleshipBoard {

  constructor(dimension = 10) {
    this.grid = new Map();
    this.dimension = dimension;
    this.totalShips = 0;
    this.sunkShips = 0;
    this.revealedSpaces = 0;
    this.successShots = 0;
  }

  initialize = (nShips4Spaces = 1, nShips3Spaces = 2, nShips2Spaces = 3, nShips1Spaces = 4) => {
    let boardPlaced = false;
    while (!boardPlaced) {
      this.grid = this.findShipPositions(this.grid, nShips4Spaces, nShips3Spaces, nShips2Spaces, nShips1Spaces);
      boardPlaced = !!this.grid;
      if (!boardPlaced) this.grid = new Map();
    }
    this.totalShips = nShips4Spaces + nShips3Spaces + nShips2Spaces + nShips1Spaces;
    return this;
  }

  findShipPositions = (grid, l4Ships, l3Ships, l2Ships, l1Ships) => {
    let shipsPlaced = [0,0,0,0];
    let shipPlaced = false;
    if (l4Ships + l3Ships + l2Ships + l1Ships === 0) {
      return grid;
    } else if (l4Ships > 0) {
      shipPlaced = this.placeShip(grid, 4);
      shipsPlaced[3]++;
    } else if (l3Ships > 0) {
      shipPlaced = this.placeShip(grid, 3);
      shipsPlaced[2]++;
    } else if (l2Ships > 0) {
      shipPlaced = this.placeShip(grid, 2);
      shipsPlaced[1]++;
    } else if (l1Ships > 0) {
      shipPlaced = this.placeShip(grid, 1);
      shipsPlaced[0]++;
    }
    if (!shipPlaced) {
      return false;
    }

    return this.findShipPositions(grid, l4Ships - shipsPlaced[3], l3Ships - shipsPlaced[2], l2Ships - shipsPlaced[1], l1Ships - shipsPlaced[0]);
  }

  placeShip = (grid, longBoat) => {
    let placed = false;
    //BORRAR
    let tries = 0;
    while (!placed && tries < 50) {
      tries++;
      const randomPos = randomNumber(0, 100);
      const randomDir = randomNumber(0, 4);
      if (this.canPlace(grid, longBoat, randomPos, randomDir)) {
        let shipPositions = [];
        for (const x of Array(longBoat).keys()) {
          switch (randomDir) {
            case SHIP_DIRECTION.TOP:
              this.setShipSpace(grid, randomPos - this.dimension * x, shipPositions);
              break;
            case SHIP_DIRECTION.RIGHT:
              this.setShipSpace(grid, randomPos + x, shipPositions);
              break;
            case SHIP_DIRECTION.BOTTOM:
              this.setShipSpace(grid, randomPos + this.dimension * x, shipPositions);
              break;
            case SHIP_DIRECTION.LEFT:
              this.setShipSpace(grid, randomPos - x, shipPositions);
              break;
            default:
              break;
          }
        }
        shipPositions.forEach(pos => {
          grid.get(pos).setOtherParts(shipPositions);
        });
        placed = true;
      }
    }
    return placed;
  }

  setShipSpace(grid, position, shipPositions) {
    grid.set(position, new BoardSpace());
    shipPositions.push(position);
  }

  canPlace(grid, longBoat, initPos, direction) {
    let currentPos;
    if (!this.shipFitsHorizontally(longBoat, initPos, direction)) {
      return false;
    }
    for (const l of Array(longBoat).keys()) {
      switch (direction) {
        case SHIP_DIRECTION.TOP:
          currentPos = initPos - this.dimension * l;
          break;
        case SHIP_DIRECTION.RIGHT:
          currentPos = initPos + l;
          break;
        case SHIP_DIRECTION.BOTTOM:
          currentPos = initPos + this.dimension * l;
          break;
        case SHIP_DIRECTION.LEFT:
          currentPos = initPos - l;
          break;
        default:
          break;
      }
      if (!this.isPositionInsideGrid(currentPos) ) {
        return false;
      }
      for (const x of Array(3).keys()) {
        for (const y of Array(3).keys()) {
          const checkPos = currentPos + (x - 1) + this.dimension * (y - 1);
          if (!(this.isPositionInsideGrid(checkPos) && this.isEmptySpace(grid, checkPos))) {
            return false;
          }
        }
      }
    }
    return true;
  }

  shipFitsHorizontally(longBoat, initPos, direction) {
    const temp = initPos % this.dimension;
    switch (direction) {
      case SHIP_DIRECTION.RIGHT:
        return temp + longBoat - 1 <= this.dimension - 1;
      case SHIP_DIRECTION.LEFT:
        return temp - longBoat + 1 >= 0
      default:
        return true;
    }
  }

  isPositionInsideGrid(position) {
    return !(position < 0 || position > this.dimension * this.dimension - 1);
  }

  isEmptySpace(grid, position) {
    return !grid.get(position);
  }

  doesHitShip = (position) => {
    const space = this.grid.get(position);
    if (!space) return false;
    
    const isGoodShot = space.handleShot();
    return isGoodShot;
  }

  shootSpace = (position) => {
    const space = this.grid.get(position);
    if (!space) {
      this.revealedSpaces++;
      this.grid.set(position, new BoardSpace(BOARD_SPACE_STATUS.EMPTY));
      sound.playWatterEffect();
    } else  if (space.isHealtly()){
      space.handleShot();
      sound.playMissileEffect();
      this.revealedSpaces++;
      this.successShots++;
      this.checkShipIntegrity(space.shipPositions);
    }
    return this;
  }

  checkShipIntegrity = (shipPositions) => {
    let isSunk = true;
    shipPositions.forEach((pos) => {
      if (this.grid.get(pos).isHealtly()) {
        isSunk = false;
      }
    });

    if (isSunk) {
      shipPositions.forEach((pos) => {
        this.grid.get(pos).sinkArea();
      });
      this.sunkShips++;
    }
  }
}

export default BattleshipBoard;