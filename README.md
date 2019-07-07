# cypress-helper-redux

![npm](https://img.shields.io/npm/v/cypress-helper-redux.svg?style=flat-square)

> [Cypress](https://www.cypress.io/) [commands](https://docs.cypress.io/api/cypress-api/custom-commands.html) for manipulating Redux in tests.

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
  const value = store.getState().slice.value;
  // Dispatch an action
  store.dispatch(actions.slice.someAction());
});

// Visit with initial state
cy.reduxVisit('/', { initialState: { ... }});

// Dispatch a single action
cy.reduxDispatch(actions => actions.set(myInitialState));

// Dispatch multiple actions
cy.reduxDispatch(actions => [actions.reset(), actions.slice.setVisible(true)]);

// Dispatch custom action
cy.reduxDispatch(() => ({ type: 'my-custom-action' }));
```

_**Note:** See [tests](test/tests/redux.ts) for more examples._
