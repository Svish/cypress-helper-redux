import redux from './redux';
import reduxVisit from './reduxVisit';
import reduxDispatch from './reduxDispatch';
import reduxSelect from './reduxSelect';

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
