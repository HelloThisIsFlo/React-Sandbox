import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sandbox from './presentation/sandbox/Sandbox';
import registerServiceWorker from './registerServiceWorker';

// Temp fix for 'material-ui'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const MaterialUiWrapper = () => (
  // <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
  <MuiThemeProvider>
    <Sandbox />
  </MuiThemeProvider>
);

ReactDOM.render(
  <MaterialUiWrapper />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();