# cypress-helper-redux

[![npm version](https://img.shields.io/npm/v/cypress-helper-redux.svg?style=flat-square)](https://www.npmjs.com/package/cypress-helper-redux)

> [Cypress](https://www.cypress.io/) [commands](https://docs.cypress.io/api/cypress-api/custom-commands.html) for manipulating a [Redux](https://redux.js.org/) store during testing. For example to:
>
> - Set up a predictable state before certain tests
> - Dispatch actions to make state adjustmens before or during tests
> - Validate state during or after tests have run

## Inspiration

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State)
- [This presentation at YouTube](https://www.youtube.com/watch?v=5XQOK0v_YRE&t=1568)

## Usage

### `cy.reduxVisit`

A wrapper around [`cy.visit`](https://docs.cypress.io/api/commands/visit.html#Syntax) which allows you to specify the initial Redux state you want for a test:

```ts
cy.reduxVisit('/', {
  initialState: { ... },
});
```

Other options you supply will be sent through to `cy.visit`:

```ts
cy.reduxVisit('/', {
  initialState: { ... },
  method: 'GET',
  onBeforeLoad: (window) => console.log(window),
});
```

If you don't want or need to specify any initial state, you can of course also just use `cy.visit` as you normally would.

### `cy.redux`

Gives direct access to the Redux store to do with as you please.

```ts
cy.redux().then(({ store }) => {
  store.dispatch({
    type: 'set-value',
    payload: 'something',
  });

  const value = store.getState().foo.value;
  expect(value).to.equal('something');
});
```

If you hooked up the action creators and selectors, they're passed in as the next arguments:

```ts
cy.redux().then(({ store, actions, selectors }) => {
  store.dispatch(actions.foo.setSomething('something'));
  const value = selectors.foo.getSomething(store.getState());
});
```

### `cy.reduxSelect`

Wrapper around `cy.redux` for selecting a value from the current state, for example to validate something after or during a test.

```ts
// Using a function
cy.reduxSelect(state => state.foo.value).then(value => {
  expect(value).to.equal('something');
});

// Using an already defined selector function
cy.reduxSelect(getValue).then(value => {
  expect(value).to.equal('something');
});
```

### `cy.reduxSelector`

Wrapper around `cy.reduxSelect` which, if you've provided it, gives you access to the selectors object so you can pick your selector from that.

```ts
cy.reduxSelector(selectors => selectors.foo.getValue).then(value => {
  expect(value).to.equal('something');
});
```

### `cy.reduxDispatch`

Wrapper around `cy.redux` for dispatching actions, for example to set something up before or during a test.

```ts
// Single action
cy.reduxDispatch({ type: 'my-action' });

// Multiple actions, as parameters
cy.reduxDispatch(
  { type: 'my-action' },
  { type: 'my-other-action' },
  { type: 'my-third-action' }
);

// Multiple actions, as array
cy.reduxDispatch([
  { type: 'my-action' },
  { type: 'my-other-action' },
  { type: 'my-third-action' },
]);
```

You can also provide a callback for creating the actions:

```ts
// Callback returning a single action
cy.reduxDispatch(() => ({ type: 'my-action' }));

// Callback returning an array of actions
cy.reduxDispatch(() => [
  { type: 'my-action' },
  { type: 'my-other-action' },
  { type: 'my-third-action' },
]);
```

And if you've hooked up the action creators object, it's passed in as the first argument:

```ts
// Callback returning a single action, using the action creators object
cy.reduxDispatch(actions => actions.foo.myAction());

// Callback returning multiple action, using the action creators object
cy.reduxDispatch(actions => [
  actions.foo.myAction(),
  actions.foo.myOtherAction(),
  actions.foo.myThirdAction(),
]);
```

## Setup

> _**Note:** For a complete example on hooking things up, with types and everything, have a look at the [sample app](app)._

### 1. Install dependency

```shell
npm install --save-dev cypress-helper-redux
```

### 2. Include the custom commands

```js
// In e.g. cypress/support/index.ts
include 'cypress-helper-redux';
```

### 3. Connect the helper with your store

```ts
// E.g. in src/store/index.ts

// Get initial state (for using cy.reduxVisit)
const initialState =
  'Cypress' in window ? (window as any).__chr__initialState__ : undefined;

// Create the store, as you normally would
const store = createStore(rootReducer, initialState);
export default store;

// Connect with the Cypress helper
if ('Cypress' in window) {
  const w = window as any;
  w.__chr__store__ = store;

  // The following is optional
  // See the sample app for an example of how this can be setup and used
  w.__chr__actionCreators__ = actionCreators;
  w.__chr__selectors__ = selectors;
}
```

### 4. Typescript

The Redux helper should know at least the first 2 of the following types, but preferably all of them if you want full IDE and typechecking joyfulness:

- `MyStore` – The type of your Redux store, i.e. the type of what `createStore` returns  
  Or `import { Store as MyStore } from redux` if you don't care
- `MyRootState` – The shape of your root state  
  Or `type MyRootState = any` if you don't care
- `MyRootAction` – The type of an allowed action  
  Or `type MyRootAction = AnyAction` if you don't care or have a type for that
- `MyActionCreators` – The type of your action creator object  
  Or `type MyActionCreators = any | undefined` if you don't care or don't use it
- `MySelectors` – The type of your selectors object  
  Or `type MySelectors = any | undefined` if you don't care or don't use it

I haven't found a way to declare those types in an application and then "inject" them into `cypress-helper-redux` in a way that allows automatically adjusting the Cypress API correctly. So... as a work around, create a type-definition file in you Cypress directory, paste the following into it, and adjust the types mentioned above as needed:

```ts
// E.g in cypress/support/cypress-helper-redux.d.ts

// Import and/or define the types mentioned above
import {
  Store as MyStore,
  RootState as MyRootState,
  RootAction as MyRootAction,
  ActionCreators as MyActionCreators,
  Selectors as MySelectors,
} from '../../src/store';

// NOTE: Leave the following untouched

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
```

# TODO

1. **Typesafe Cypress commands, without copy-pasting stuff**  
   Really not sure how though... ideas are welcome... 😕

2. **Snapshot logging**  
   In Cypress there seems to be a way to do snapshot logging, which I think would be very good to do before and after dispatching Redux actions. But, I haven't yet been able to figure out exactly how one does that... so, please let me know if you have any pointers... 🤔

3. **Helper functions to connect store with helper**  
   Should be simple in theory, but for some reason, everything seems to crash (getting `cy is not defined` in Cypress) the _instant_ I do _any_ import of helper code from the application code... Might be simple enough as it is though, and it might prevent any helper code ending up in application bundles, so... maybe better the way it is...? Advice and feedback welcome... 👍
