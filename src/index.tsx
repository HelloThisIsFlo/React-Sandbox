import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sandbox from './presentation/sandbox/Sandbox';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const MaterialUiWrapper = () => (
  <MuiThemeProvider>
    <Sandbox />
  </MuiThemeProvider>
);

ReactDOM.render(
  <MaterialUiWrapper />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

// Temp fix for 'material-ui'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();