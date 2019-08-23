declare namespace Cypress {
  interface Chainable<Subject> {
    redux: typeof import('./redux').default;
    reduxVisit: typeof import('./reduxVisit').default;
    reduxDispatch: typeof import('./reduxDispatch').default;
    reduxSelect: typeof import('./reduxSelect').default;
  }
}
