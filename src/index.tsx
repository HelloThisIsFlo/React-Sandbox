import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sandbox from './presentation/sandbox/Sandbox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Sandbox />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
