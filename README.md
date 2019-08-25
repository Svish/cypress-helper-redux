# cypress-helper-redux

[![npm version](https://img.shields.io/npm/v/cypress-helper-redux.svg?style=flat-square)](https://www.npmjs.com/package/cypress-helper-redux)

> [Cypress](https://www.cypress.io/) [commands](https://docs.cypress.io/api/cypress-api/custom-commands.html) for manipulating a [Redux](https://redux.js.org/) store during testing. For example to:
>
> - Set up a predictable state before certain tests
> - Dispatch actions to make state adjustmens during tests
> - Validate state during or after tests have run

## Inspiration

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State)
- [This presentation at YouTube](https://www.youtube.com/watch?v=5XQOK0v_YRE&t=1568)

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

// Expose it so the helper knows where to find it
if ('Cypress' in window) (window as any).__chr__reduxStore__ = store;
```

And, optionally, if you want access to an action creators object when using `cy.redux` and `cy.reduxDispatch`:

```ts
// E.g. in src/store/rootAction.ts

// Import all the action creators in your application
import { actions as foo } from '../components/Foo/foo.ducks';
import { actions as bar } from '../components/Bar/bar.ducks';

// Gather them all up into one object
const actionCreators = { foo, bar };

// Expose it so the helper knows where to find it
if ('Cypress' in window) {
  (window as any).__chr__actionCreators__ = actionCreators;
}
```

### 4. If you're using Typescript...

Unfortunately I've not found a simple way to both automatically extend the Cypress chain correctly _**and** allow you to specify/override the type of e.g. your Redux state_. So, the two options I've found which seems to be stable (i.e. work fine in VS Code) are:

#### 4.1. Declare the custom commands via imports

Super easy, but provides no typesafety for e.g. your `state`. They will be of type `any`:

```ts
// In e.g. cypress/support/cypress-helper-redux.d.ts

// Import the commands
import {
  redux,
  reduxVisit,
  reduxDispatch,
  reduxSelect,
} from 'cypress-helper-redux';

// And add them to the Cypress chain
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      redux: typeof redux;
      reduxVisit: typeof reduxVisit;
      reduxDispatch: typeof reduxDispatch;
      reduxSelect: typeof reduxSelect;
    }
  }
}
```

#### 4.2. Redeclare the custom commands manually with your wanted types

Lets you specify the type of e.g. your `state`, meaning much better typesafety and help from your IDE when writing tests, but also requires you to declare the Cypress commands for Typescript manually. A bit of a hassle, but it's pretty much copy paste from below, and definitely worth it in my opinion. Up to you what types you define and how (obviously), but I highly recommend at least defining `MyStore` and `MyRootState`. The types used, that you need to define as _something_ are:

- `MyStore` – The type returned by `createStore`
- `MyRootState` – The shape of your root state
- `MyRootAction` – The type of allowed actions, e.g. `AnyAction` or a composite type of all your applications defined actions
- `MyActionCreators` – The type of your action creator object

Create a new file, e.g. `cypress/support/cypress-helper-redux.d.ts`, and start by defining those types:

```ts
// If you have all the types:
import {
  Store as MyStore,
  RootState as MyRootState,
  RootAction as MyRootAction,
  ActionCreators as MyActionCreators,
} from '../../src/store';
```

```ts
// If you for example have store and state,
// but don't care about action types
import { Store as MyStore, RootState as MyRootState } from '../../src/store';
import { AnyAction as MyRootAction } from 'redux';
type MyActionCreators = undefined;
```

Then simply copy the following and paste it in below:

```ts
// Define cy.redux
type ReduxCallback = (store: MyStore, actionCreators: MyActionCreators) => void;
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
  actionCreators: ActionsCreators
) => MyRootAction | MyRootAction[];
type ReduxDispatch = (callback: ReduxDispatchCallback) => void;

// Define cy.reduxSelect
type ReduxSelectSelector<T> = (state: MyRootState) => T;
type ReduxSelectCallback<T> = (value: T) => void;
type ReduxSelect = <T>(
  selector: ReduxSelectSelector<T>,
  callback: ReduxSelectCallback<T>
) => void;

// Add them all to the Cypress chain
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
```

> _**Please**, do let me know if you have any ideas of how to make this easier..._

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
cy.redux(store => {
  store.dispatch({
    type: 'set-value',
    payload: 'something',
  });

  const value = store.getState().foobar.value;
  expect(value).to.equal('something');
});
```

If you hooked up the action creators object, it's passed in as the second argument:

```ts
cy.redux((store, actions) => {
  store.dispatch(actions.foo.setSomething('something'));
});
```

With destructuring:

```ts
cy.redux(({ getState, dispatch }, { foo }) => {
  dispatch(foo.setSomething('something'));

  const { value } = getState().foobar;
  expect(value).to.equal('something');
});
```

### `cy.reduxSelect`

Wrapper around `cy.redux` for when you just want to select a value from the current state, for example to validate something after or during a test.

```ts
// Using a function
cy.reduxSelect(
  state => state.foobar,
  value => {
    expect(value).to.equal('something');
  }
);

// Using an already defined selector function
cy.reduxSelect(selectFoobar, value => {
  expect(value).to.equal('something');
});
```

### `cy.reduxDispatch`

Wrapper around `cy.redux` for when you just want to dispatch an action or three, for example to set something up before or during test.

```ts
cy.reduxDispatch(() => ({ type: 'my-action' }));

cy.reduxDispatch(() => [
  { type: 'my-action' },
  { type: 'my-other-action' },
  { type: 'my-third-action' },
]);
```

If you hooked up the action creators object, it's passed in as the first argument:

```ts
cy.reduxDispatch(actions => actions.foo.myAction());

cy.reduxDispatch(actions => [
  actions.foo.myAction(),
  actions.foo.myOtherAction(),
  actions.foo.myThirdAction(),
]);
```

Using destructuring:

```ts
cy.reduxDispatch(({ foo }) => [
  foo.myAction(),
  foo.myOtherAction(),
  foo.myThirdAction(),
]);
```

# TODO

1. **Strongly typed state and action creators**  
   Figure out a better way to get typesafe Cypress commands... 🤔

2. **Snapshot logging**  
   In Cypress there seems to be a way to do snapshot logging, which would be perfect to do before and after having dispatched any actions. However, I haven't yet been able to figure out exactly how one does that... please let me know if you have any pointers... 🤔

3. **Helper functions to connect store and action creators to the helper**  
   Should be simple in theory, but for some reason, everything seems to crash (getting `cy is not defined` in Cypress) the instant I do _any_ import of helper code from application code... 😕  
   Might also be simple enough as it is... and it prevents any helper code ending up in the application bundle, so... maybe better the way it is...? 🤔
