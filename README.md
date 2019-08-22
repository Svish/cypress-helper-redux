# cypress-helper-redux

[![npm version](https://img.shields.io/npm/v/cypress-helper-redux.svg?style=flat-square)](https://www.npmjs.com/package/cypress-helper-redux)

> [Cypress](https://www.cypress.io/) [commands](https://docs.cypress.io/api/cypress-api/custom-commands.html) for manipulating a Redux store during testing. For example to set up a predictable state before certain tests, validate state after tests have run, etc.

## Inspiration

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State)
- [This presentation at YouTube](https://www.youtube.com/watch?v=5XQOK0v_YRE&t=1568)

## Setup

1. Install:

```shell
npm install cypress-helper-redux
```

2. Include:

```ts
// cypress/support/index.ts
include 'cypress-helper-redux';
```

3. Connect:

```ts
// e.g. in src/store/index.ts

// Get your initial state set via reduxVisit, if any:
const initialState =
  'Cypress' in window ? (window as any).__chr__initialState__ : undefined;

// Create the store, as you normally would:
const store = createStore(rootReducer, initialState);

// Expose it so the helper knows where to find it:
if ('Cypress' in window) (window as any).__chr__ReduxStore__ = store;
```

## Usage

> _**Note:** For a working example of setting up and using this helper, you can check out the [test app](app)._

### `cy.reduxVisit`

A wrapper around `cy.visit` which allows you to specify the initial state you want for a test.

```ts
cy.reduxVisit('/', {
  initialState: { ... },
});
```

Any other options you supply will be passed through to the wrapped call to `cy.visit`.

```ts
cy.reduxVisit('/', {
  initialState: { ... },
  method: 'GET',
  onBeforeLoad: (window) => console.log(window),
});
```

If you don't want/need to specify any initial state, you can of course also just use `cy.visit` as you normally would.

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

Using destructuring, action creators and selector functions can make your tests even cleaner:

```ts
cy.redux(({ getState, dispatch }) => {
  dispatch(setValue('something'));

  const value = getValue(getState());
  expect(value).to.equal('something');
});
```

### `cy.reduxDispatch`

Wrapper around `cy.redux` for a cleaner way to only dispatch an action or two.

```ts
// Using plain object:
cy.reduxDispatch(() => ({ type: 'my-action' }));

// Using an action creator:
cy.reduxDispatch(() => myAction());
```

You can also return an `array` to easily dispatch multiple actions in order.

```ts
// Using plain objects:
cy.reduxDispatch(() => [{ type: 'my-action' }, { type: 'my-other-action' }]);

// Using action creators:
cy.reduxDispatch(() => [myAction(), myOtherAction()]);
```

## Usage with an Action Creators object

To create actions to dispatch you can (of course) both implement custom action creators in your tests and import action creators from application code. However, sometimes this can be tricky since Cypress will then (obviously) need access to your application source code _and_ know how to and compile/read it properly. With a combination of typescript, webpack, babel, bundlers, etc., etc., this can sometimes be easier said than done...

I want dispatching actions to be as simple and clean as possible, so my tests can be kept as simple and clean as possible, regardless of all that.

So, optionally, you can also expose an "action creators object" to the helper which will then be passed along to any `cy.redux` and `cy.reduxDispatch` callbacks.

### Setup

```ts
// e.g. in src/store/rootAction.ts

// Import all the action creators from your application
import { actions as foo } from '../components/Foo/foo.ducks';
import { actions as bar } from '../components/Bar/bar.ducks';

// Gather them all up into an object
const actionCreators = { foo, bar };

// Expose it so the helper knows where to find it:
if ('Cypress' in window) {
  (window as any).__chr__actionCreators__ = actionCreators;
}
```

### Usage

```ts
cy.redux((store, actions) => {
  store.dispatch(actions.foo.someAction());
});

cy.reduxDispatch(actions => actions.foo.someAction());

cy.reduxDispatch(actions => [
  actions.bar.doOne(),
  actions.bar.doTwo(),
  actions.bar.doThree(),
]);

// Potentially even more compact using destructuring:
cy.reduxDispatch(({ bar }) => [bar.doOne(), bar.doTwo(), bar.doThree()]);
```

# TODO

1. **Helper functions to connect store and action creators to the helper**  
   Should be simple in theory, but for some reason, everything seems to crash (`cy is not defined` in Cypress) the instant I do any imports in the application code from the helper code... 😕

2. **Strongly typed state and action creators**  
   The state and action creators are currently both typed as `any`, and I'd really like them not to be. But I'm not sure how to get those two types from the application code "into" the added Cypress helper method chaining thing in a smooth way... ideas are welcome... 🤔

3. **Snapshot logging**  
   In Cypress there seems to be a way to do snapshot logging, which would be perfect to do before and after having dispatched any actions. However, I haven't yet been able to figure out exactly how one does that... please let me know if you have any pointers... 😕
