import { actions, select } from '../../src/components/Items/items.ducks';

describe('Redux Helper: Basic usage', () => {
  const todo = 'todo';
  const items = ['foo', 'bar'];
  const initialState = { items: { new: todo, items: [] } };

  const { addItem, setNew } = actions;
  const { items: getItems, new: getNew } = select;

  before(() => {
    cy.reduxVisit('/', { initialState });
  });

  describe('reduxVisit', () => {
    it('getStore can get initial state', () => {
      cy.redux().then(({ store: { getState } }) => {
        expect(getState()).to.deep.equal(initialState);
      });
    });
  });

  describe('redux', () => {
    it('getState and dispatch works', () => {
      cy.redux().then(({ store: { getState, dispatch } }) => {
        dispatch(setNew('foobar'));
        expect(getNew(getState())).to.equal('foobar');
      });
    });
  });

  context('with state reset before each', () => {
    beforeEach(() => {
      cy.reduxDispatch(({ set }) => set(initialState));
    });

    describe('reduxSelect', () => {
      it('can select and return a value', () => {
        cy.reduxSelect(getNew).then(value => {
          expect(value).to.equal(todo);
        });
      });
    });

    describe('reduxDispatch', () => {
      it('can dispatch single action', () => {
        cy.reduxDispatch(addItem(todo));
        cy.reduxSelect(getItems).then(items => {
          expect(items).to.include(todo);
        });
      });

      it('can dispatch multiple actions via multiple parameters', () => {
        cy.reduxDispatch(addItem(items[0]), addItem(items[1]));
        cy.reduxSelect(getItems).then(items => {
          expect(items).to.include.members(items);
        });
      });

      it('can dispatch multiple actions via array', () => {
        cy.reduxDispatch([addItem(items[0]), addItem(items[1])]);
        cy.reduxSelect(getItems).then(items => {
          expect(items).to.include.members(items);
        });
      });

      context('via callback', () => {
        it('can dispatch single action', () => {
          cy.reduxDispatch(() => addItem('from cypress'));
          cy.reduxSelect(getItems).then(items => {
            expect(items).to.include('from cypress');
          });
        });

        it('can dispatch multiple actions', () => {
          cy.reduxDispatch(() => [addItem(items[0]), addItem(items[1])]);
          cy.reduxSelect(getItems).then(items => {
            expect(items).to.include.members(items);
          });
        });
      });
    });
  });
});
