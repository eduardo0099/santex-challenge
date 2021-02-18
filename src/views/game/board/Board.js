import { BOARD_SPACE_STATUS } from '@models/BoardSpace';
import './board.scss';

const Board = ({board, onClickSpace}) => {
  const gridDimention = board.dimension;

  const nodeClass = (boardSpace) => {
    let nodeStyle = "boardgame__cell ";

    if (!boardSpace) {
      nodeStyle += BOARD_SPACE_STATUS.HEALTHY;
    } else {
      nodeStyle += boardSpace.status;
    }
    return nodeStyle;
  };

  const getRowName = (rowPos) => (
    String.fromCharCode(97 + rowPos).toUpperCase()
  );

  return (
    <table className="boardgame">
      <tbody>
        <tr>
          {[...Array(gridDimention + 1).keys()].map((rowPos) => (
            <td key={rowPos} className="boardgame__row-label">{rowPos ? rowPos : ""}</td>
          ))}
        </tr>
        {[...Array(gridDimention).keys()].map((rowPos) => (
          <tr key={rowPos}>
            <td className="boardgame__row-label">{getRowName(rowPos)}</td>
            {[...Array(gridDimention).keys()].map((colPos) => (
              <td
                key={colPos}
                className={nodeClass(board.grid.get(rowPos * gridDimention + colPos))}
                data-position={rowPos * gridDimention + colPos}
                onClick={onClickSpace}
              >
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;