// Fix for the polyfill warning in tests.
// It mocks a (missing?) function? 
// Definitely not sure what it does. Need to investigate.

(global as any).requestAnimationFrame = (callback: any) => {
    setTimeout(callback, 0);
};

import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new ReactSixteenAdapter() });

import { customMatchers } from './CustomTestMatchers';

expect.extend(customMatchers.almostEqualMatchers);

declare namespace jest {
  interface Frank {
    hello(): void;
  }
  interface Matchers<R> {
    frank(): R;
  }
}
