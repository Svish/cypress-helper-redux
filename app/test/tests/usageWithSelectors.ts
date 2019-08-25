import selectors from '../../src/store/rootSelector';
import { select } from '../../src/components/Items/items.ducks';

describe('Redux Helper: Usage with selectors', () => {
  const TEST = 'test';

  before(() => {
    cy.reduxVisit('/', {
      initialState: {
        items: { items: [], new: TEST },
      },
    });
  });

  describe('redux', () => {
    it('gets selectors', () => {
      cy.redux((_store, _actions, selectors) => {
        expect(selectors)
          .to.be.an('object')
          .that.has.all.keys(selectors);
      });
    });
  });

  describe('reduxSelector', () => {
    it('gets selectors', () => {
      cy.reduxSelector(
        selectors => {
          expect(selectors)
            .to.be.an('object')
            .that.has.all.keys(selectors);
          return selectors.items.new;
        },
        value => expect(value).to.equal(TEST)
      );
    });
  });
});
