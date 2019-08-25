import {
  Store as MyStore,
  RootState as MyRootState,
  RootAction as MyRootAction,
  ActionCreators as MyActionCreators,
  Selectors as MySelectors,
} from '../../src/store';

// Define cy.redux
type ReduxCallback = (
  store: MyStore,
  actionCreators: MyActionCreators,
  selectors: MySelectors
) => void;
type Redux = (callback: ReduxCallback) => void;

// Define cy.reduxVisit
type ReduxVisitOptions = { initialState: Partial<MyRootState> } & Partial<
  Cypress.VisitOptions
>;
type ReduxVisit = (
  url: string,
  options: ReduxVisitOptions
) => Cypress.Chainable<Window>;

// Define cy.reduxDispatch
type ReduxDispatchCallback = (
  actions: MyActionCreators
) => MyRootAction | MyRootAction[];
type ReduxDispatchParameter =
  | MyRootAction
  | MyRootAction[]
  | ReduxDispatchCallback;
type ReduxDispatch = (...actionsOrCallback: ReduxDispatchParameter[]) => void;

// Define cy.reduxSelect
type ReduxSelectSelector<T> = (state: MyRootState) => T;
type ReduxSelectCallback<T> = (value: T) => void;
type ReduxSelect = <T>(
  selector: ReduxSelectSelector<T>,
  callback: ReduxSelectCallback<T>
) => void;

// Define cy.reduxSelector
type ReduxSelectPickSelector<T> = (
  selectors: MySelectors
) => ReduxSelectSelector<T>;
type ReduxSelector = <T>(
  pickSelector: ReduxSelectPickSelector<T>,
  callback: ReduxSelectCallback<T>
) => void;

// Add them all to the Cypress chain
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      redux: Redux;
      reduxVisit: ReduxVisit;
      reduxDispatch: ReduxDispatch;
      reduxSelect: ReduxSelect;
      reduxSelector: ReduxSelector;
    }
  }
}
