describe('Cypress Redux helper', () => {
  before(() => {
    cy.reduxVisit('/', {
      initialState: { items: { new: '', items: ['foo', 'bar'] } },
    });
  });

  describe('redux', () => {
    it('can get store', () => {
      cy.redux(store => {
        const { items } = store.getState();
        expect(items.items).to.have.lengthOf(2);
      });
    });
  });

  describe('reduxDispatch', () => {
    it('can dispatch actions', () => {
      cy.reduxDispatch(() => ({
        type: 'items/add-item',
        payload: 'from cypress',
      }));
    });
  });
});
