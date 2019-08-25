import redux from './redux';
import reduxVisit from './reduxVisit';
import reduxDispatch from './reduxDispatch';
import reduxSelect from './reduxSelect';

export { redux, reduxVisit, reduxDispatch, reduxSelect };

import { ifCypress } from './common';

ifCypress(() => {
  Cypress.Commands.add('redux', { prevSubject: false }, redux);
  Cypress.Commands.add('reduxVisit', { prevSubject: false }, reduxVisit);
  Cypress.Commands.add('reduxDispatch', { prevSubject: false }, reduxDispatch);
  Cypress.Commands.add('reduxSelect', { prevSubject: false }, reduxSelect);
});
