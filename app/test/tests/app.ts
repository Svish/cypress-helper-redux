import { select } from '../../src/components/Items/items.ducks';

/**
 * NOTE: Just a sanity check of the app functionality, and not meant as a good
 *   example of how  you should test your own apps. The redux manipulation is
 *   not needed here either, since there's no authentication or other
 *   complicated state setup to deal with in this small test app.
 */
describe('App', () => {
  before(() => {
    cy.visit('/');
  });

  it('Should work', () => {
    cy.getCy('form/input')
      .as('input')
      .should('exist')
      .and('be.empty');

    cy.getCy('form/button')
      .as('button')
      .should('exist')
      .and('be.disabled');

    cy.getCy('list')
      .as('list')
      .should('be.empty');

    const tasks = ['Go to the park', 'Buy groceries'];

    tasks.forEach(task => {
      cy.get('@input')
        .type(task)
        .should('have.value', task);

      cy.get('@button')
        .should('not.be.disabled')
        .click();

      cy.get('input').should('be.empty');
      cy.get('button').should('be.disabled');
    });

    cy.get('@list')
      .should('not.be.empty')
      .within(() => {
        tasks.forEach(task => {
          cy.getCy('list/item').should('contain.text', task);
        });
      });
  });
});
