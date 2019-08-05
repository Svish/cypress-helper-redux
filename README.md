# cypress-helper-redux

[![npm version](https://img.shields.io/npm/v/cypress-helper-redux.svg?style=flat-square)](https://www.npmjs.com/package/cypress-helper-redux)

> [Cypress](https://www.cypress.io/) [commands](https://docs.cypress.io/api/cypress-api/custom-commands.html) for manipulating Redux in tests.

## ⚠ Under construction

- Documented usage is only partially implemented. The missing part is the `actions` object with action creators. This is of course not necessary for things to work, since you can also just create the action objects manually, but it is very handy and makes tests much cleaner.
- How to actually expose the store (and action creators) to the helper is not documented yet, as I haven't quite figured out how to make it as easy as possible.

If you still want to try this out right now, you can check out the `app` directory for an example of how to hook things up and use it. Just be aware that the actual setup might change a bit. How to use the helper in tests however should be pretty stable and look like it does now.

## Inspiration

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State)
- [This presentation at YouTube](https://www.youtube.com/watch?v=5XQOK0v_YRE&t=1568)

## Install

```shell
npm install cypress-helper-redux
```

```js
// cypress/support/index.js
include 'cypress-helper-redux';

// TODO: Document connecting to store and actions

```

## Usage

```js

// Manipulate the store
cy.redux((store, actions) => {
  // Get a value from the store
  const value = store.getState().foobar.value;
  // Dispatch an action
  store.dispatch(actions.foobar.someAction());
});

// Visit with initial state
cy.reduxVisit('/', { initialState: { ... }});

// Dispatch a single action
cy.reduxDispatch(actions => actions.set(myInitialState));

// Dispatch multiple actions
cy.reduxDispatch(actions => [
  actions.reset(),
  actions.foobar.setVisible(true),
]);

// Dispatch custom action
cy.reduxDispatch(() => ({ type: 'my-custom-action' }));

// Dispatch multiple custom actions
cy.reduxDispatch(() => [
  { type: 'my-custom-action' },
  { type: 'my-other-custom-action' },
]);
```

_**Note:** See [tests](test/tests/redux.ts) for more examples._
