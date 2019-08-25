import reduxSelect, { ReduxSelectSelector } from './reduxSelect';
import { SELECTORS } from './common';

export type ReduxSelectPickSelector<T> = (
  selectors: any
) => ReduxSelectSelector<T>;

// TODO: Add option to turn off logging, like for `get`
export default <T>(pickSelector: ReduxSelectPickSelector<T>): Promise<T> => {
  const window = (cy as any).state('window');
  const selector = pickSelector(window[SELECTORS]);
  return reduxSelect<T>(selector);
};
