import redux from './redux';
import { State } from './util';

type ReduxSelectSelector<T> = (state: State) => T;
type ReduxSelectCallback<T> = (value: T) => void;

// TODO: Add option to turn off logging, like for `get`
export default <T>(
  selector: ReduxSelectSelector<T>,
  callback: ReduxSelectCallback<T>
): void => {
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
