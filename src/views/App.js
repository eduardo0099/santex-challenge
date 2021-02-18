import { Route, BrowserRouter } from 'react-router-dom';
import { Home } from '@views/home';
import { Game } from '@views/game';
import { ConfigPanel } from '@views/configPanel';
import './global.scss';
import { Fragment } from 'react';
import { ConfirmationModal } from '@components/confirmationModal';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/config" component={ConfigPanel} />
      </BrowserRouter>
      <ConfirmationModal/>
    </Fragment>
  );
}

export default App;
