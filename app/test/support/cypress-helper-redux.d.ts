import {
  Store as MyStore,
  RootState as MyRootState,
  RootAction as MyRootAction,
  ActionCreators as MyActionCreators,
} from '../../src/store';

type ReduxCallback = (store: MyStore, actionCreators: MyActionCreators) => void;
type Redux = (callback: ReduxCallback) => void;

type ReduxVisitOptions = { initialState: Partial<MyRootState> } & Partial<
  Cypress.VisitOptions
>;
type ReduxVisit = (
  url: string,
  options: ReduxVisitOptions
) => Cypress.Chainable<Window>;

type ReduxDispatchCallback = (
  actionCreators: ActionsCreators
) => MyRootAction | MyRootAction[];
type ReduxDispatch = (callback: ReduxDispatchCallback) => void;

type ReduxSelectSelector<T> = (state: MyRootState) => T;
type ReduxSelectCallback<T> = (value: T) => void;
type ReduxSelect = <T>(
  selector: ReduxSelectSelector<T>,
  callback: ReduxSelectCallback<T>
) => void;

declare global {
  declare namespace Cypress {
    interface Chainable<Subject> {
      redux: Redux;
      reduxVisit: ReduxVisit;
      reduxDispatch: ReduxDispatch;
      reduxSelect: ReduxSelect;
    }
  }
}
