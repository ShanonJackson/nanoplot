describe('PieGraph Component', () => {
  it('renders the pie chart', () => {
      cy.visit('/pie-graph');
      cy.get('.PieGraph_base__b9Chc').should('be.visible'); // Check for visibility
  });
});