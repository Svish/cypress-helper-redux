declare namespace Cypress {
  interface Chainable<Subject> {
    redux: typeof import('./redux').default;
    reduxDispatch: typeof import('./reduxDispatch').default;
    reduxVisit: typeof import('./reduxVisit').default;
  }
}
