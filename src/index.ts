import redux from './redux';
import reduxVisit from './reduxVisit';
import reduxDispatch from './reduxDispatch';
import reduxSelect from './reduxSelect';
import reduxSelector from './reduxSelector';

export { redux, reduxVisit, reduxDispatch, reduxSelect, reduxSelector };

import { ifCypress } from './common';

ifCypress(() => {
  Cypress.Commands.add('redux', { prevSubject: false }, redux);
  Cypress.Commands.add('reduxVisit', { prevSubject: false }, reduxVisit);
  Cypress.Commands.add('reduxDispatch', { prevSubject: false }, reduxDispatch);
  Cypress.Commands.add('reduxSelect', { prevSubject: false }, reduxSelect);
  Cypress.Commands.add('reduxSelector', { prevSubject: false }, reduxSelector);
});
