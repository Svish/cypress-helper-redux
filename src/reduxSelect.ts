import redux from './redux';
import { State } from './util';

type Selector<T> = (state: State) => T;
type Callback<T> = (value: T) => void;

// TODO: Add option to turn off logging, like for `get`
export default <T>(selector: Selector<T>, callback: Callback<T>): void => {
  redux(({ getState }) => {
    const value = selector(getState());
    callback(value);
    Cypress.log({
      name: 'reduxSelect',
      displayName: 'Select',
      message: [value],
      consoleProps: () => ({
        value,
      }),
    });
  });
};
