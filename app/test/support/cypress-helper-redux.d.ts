import {
  Store as MyStore,
  RootState as MyRootState,
  RootAction as MyRootAction,
  ActionCreators as MyActionCreators,
  Selectors as MySelectors,
} from '../../src/store';

// Define cy.redux
interface ReduxResponse {
  store: MyStore;
  actions: MyActionCreators;
  selectors: MySelectors;
}
type Redux = () => Promise<ReduxResponse>;

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
type ReduxDispatch = (
  ...actionsOrCallback: ReduxDispatchParameter[]
) => Promise<void>;

// Define cy.reduxSelect
type ReduxSelectSelector<T> = (state: MyRootState) => T;
type ReduxSelect = <T>(selector: ReduxSelectSelector<T>) => Promise<T>;

// Define cy.reduxSelector
type ReduxSelectPickSelector<T> = (
  selectors: MySelectors
) => ReduxSelectSelector<T>;
type ReduxSelector = <T>(
  pickSelector: ReduxSelectPickSelector<T>
) => Promise<T>;

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
