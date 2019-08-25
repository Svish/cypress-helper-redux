import reduxSelect, {
  ReduxSelectCallback,
  ReduxSelectSelector,
} from './reduxSelect';
import { SELECTORS } from './common';

export type ReduxSelectPickSelector<T> = (
  selectors: any
) => ReduxSelectSelector<T>;

// TODO: Add option to turn off logging, like for `get`
export default <T>(
  pickSelector: ReduxSelectPickSelector<T>,
  callback: ReduxSelectCallback<T>
): void => {
  const window = (cy as any).state('window');
  const selector = pickSelector(window[SELECTORS]);
  reduxSelect<T>(selector, callback);
};
