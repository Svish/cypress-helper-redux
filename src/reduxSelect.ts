import redux from './redux';
import { State } from './common';

export type ReduxSelectSelector<T> = (state: State) => T;

// TODO: Add option to turn off logging, like for `get`
export default <T>(selector: ReduxSelectSelector<T>): Promise<T> => {
  return redux().then(({ store }) => {
    const value = selector(store.getState());
    Cypress.log({
      name: 'reduxSelect',
      displayName: 'Select',
      message: [value],
      consoleProps: () => ({
        value,
      }),
    });
    return value;
  });
};
