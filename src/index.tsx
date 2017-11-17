import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './presentation/helloworld/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Hello name="Toni" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
