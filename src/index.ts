/// <reference path="./globals.ts"/>

import redux from './redux';
import reduxDispatch from './reduxDispatch';
import reduxVisit from './reduxVisit';

Cypress.Commands.add('redux', { prevSubject: false }, redux);
Cypress.Commands.add('reduxDispatch', { prevSubject: false }, reduxDispatch);
Cypress.Commands.add('reduxVisit', { prevSubject: false }, reduxVisit);
