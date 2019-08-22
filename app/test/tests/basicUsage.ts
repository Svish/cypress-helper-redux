const initialState = { items: { new: 'todo', items: ['foo', 'bar'] } };

import { actions, select } from '../../src/components/Items/items.ducks';

describe('Redux Helper: Basic usage', () => {
  before(() => {
    cy.reduxVisit('/', { initialState });
  });

  describe('reduxVisit', () => {
    it('getStore can get initial state', () => {
      cy.redux(({ getState }) => {
        expect(getState()).to.deep.equal(initialState);
      });
    });
  });

  describe('redux', () => {
    it('getState and dispatch works', () => {
      cy.redux(({ dispatch, getState }) => {
        dispatch(actions.setNew('foobar'));
        expect(select.new(getState())).to.equal('foobar');
      });
    });
  });

  describe('reduxDispatch', () => {
    it('can dispatch single action', () => {
      cy.reduxDispatch(() => actions.addItem('from cypress'));

      cy.redux(({ getState }) => {
        const items = select.items(getState());
        expect(items).to.include('from cypress');
      });
    });

    it('can dispatch multiple actions', () => {
      cy.reduxDispatch(() => [actions.addItem('one'), actions.addItem('two')]);

      cy.redux(({ getState }) => {
        const items = select.items(getState());
        expect(items).to.include.members(['one', 'two']);
      });
    });
  });
});
