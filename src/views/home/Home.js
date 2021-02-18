import { Button } from '@components/button';
import { useHistory } from 'react-router-dom';
import { routes } from '@config/routes';
import './home.scss';

function Home() {
  const history = useHistory();

  function goToGamePage() {
    history.push(routes.CONFIG);
  }

  return (
    <div className="home">
      <h1 className="home__title"> Battleship </h1>
      <span className="home__slogan">Rule the seas</span>
      <div className="home__options-group">
        <Button onClick={goToGamePage}>Play</Button>
      </div>
    </div>
  )
}

export default Home;