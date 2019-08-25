import { INITIAL_STATE, State } from './common';

export type ReduxVisitOptions = { initialState: State } & Partial<
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

      if (visitOptions.log !== false)
        Cypress.log({
          name: 'reduxVisit',
          displayName: 'Redux',
          message: ['initialized state'],
          consoleProps: () => ({
            'Inital State': initialState,
          }),
        });

      if (typeof onBeforeLoad === 'function') onBeforeLoad(window);
    },
  });
};
