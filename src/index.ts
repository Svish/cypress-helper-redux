import redux from './redux';
import reduxDispatch from './reduxDispatch';
import reduxVisit from './reduxVisit';

Cypress.Commands.add('redux', redux);
Cypress.Commands.add('reduxDispatch', reduxDispatch);
Cypress.Commands.add('reduxVisit', reduxVisit);
