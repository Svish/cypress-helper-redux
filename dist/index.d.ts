/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    redux: typeof import('../src/redux').default;
    reduxDispatch: typeof import('../src/reduxDispatch').default;
    reduxVisit: typeof import('../src/reduxVisit').default;
  }
}
