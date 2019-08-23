import { INITIAL_STATE, State } from './util';

type ReduxVisitOptions = { initialState: State } & Partial<
  Cypress.VisitOptions
>;

export default (
  url: string,
  options: ReduxVisitOptions
): Cypress.Chainable<Window> => {
  const { initialState, onBeforeLoad, ...visitOptions } = options;

  return cy.visit(url, {
    ...visitOptions,
    onBeforeLoad: window => {
      (window as any)[INITIAL_STATE] = initialState;

      Cypress.log({
        name: 'reduxVisit',
        displayName: 'Redux',
        message: ['initialized state'],
        consoleProps: () => ({
          state: initialState,
        }),
      });

      if (typeof onBeforeLoad === 'function') onBeforeLoad(window);
    },
  });
};
