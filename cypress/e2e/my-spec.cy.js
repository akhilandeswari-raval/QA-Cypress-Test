const nameData = require('../fixtures/addData.json') 

beforeEach(() => {
  cy.on('fail',(error, runnable) => {
    error.message = 'Error detected. Continuing with next block...';
    throw error;
  });
});

describe('Test Contact App', () => {
    it('Test if the application loads correctly', () => {
      cy.visit('./contact_app.html')
    cy.get('h1.text-center').should('have.text', 'Contact List App');
    cy.get('table tbody tr').should('have.length', 1)
    cy.wait(2000);
    });
  
Cypress.Commands.add('performAdditionOfData', () => {
  cy.visit('./contact_app.html');
  const User = cy.get(':nth-child(1) > .form-control').type("CYPRESS TESTING");
  const Phone = cy.get(':nth-child(2) > .form-control').type('1122334455');
  const Email = cy.get(':nth-child(3) > .form-control').type('CYPRESSTESTING@CYPRESS.COM');
  cy.contains('Add').click();
});
    
      it('Adding User Data', () => {
        cy.visit('./contact_app.html');
        cy.fixture('addData.json').then((list) =>{
          list.forEach((names) => {
          // cy.visit('./contact_app.html');
          const username = cy.get(':nth-child(1) > .form-control').type(names.name);
          const phoneNumber = cy.get(':nth-child(2) > .form-control').type(names.phone);
          const email = cy.get(':nth-child(3) > .form-control').type(names.email);
          // cy.wait(2000)
          cy.contains('Add').click();
          // cy.wait(2000);
        });
      });

      cy.get('table tbody tr:not(:first-child)').each(($row) => {
      cy.wrap($row).find('td').eq(1).invoke('text').should('match', /^[0-9]*$/);
      cy.wrap($row).find('td').eq(2).invoke('text').should('match',  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    });
  });


    it('Editing User Data', () => {
      let oldName = "";
      cy.performAdditionOfData();
      const newName = 'Hello World';
      cy.get('.btn-info').click();
      cy.get(':nth-child(2) > :nth-child(1) > input').invoke('val').then((value) => {
        oldName = value;
        cy.log("Previous value of the user name is: " + oldName);
      });
      
      
      cy.get(':nth-child(2) > :nth-child(1) > input').clear().type(newName);
      cy.get(':nth-child(2) > :nth-child(4) > .btn').should('be.visible');
      cy.get(':nth-child(2) > :nth-child(4) > .btn').click();
      cy.get('tbody > :nth-child(2) > :nth-child(1)').invoke('text').should('eq', 'Hello World');
      cy.log("New value of the user name is: " + newName);
    });

    it('Deleting User Data', () => {
      let oldName = "";
      cy.performAdditionOfData();    
      cy.get('tbody > :nth-child(2) > :nth-child(1)').invoke('val').then((value) => {
        oldName = value;
        cy.log("Previous value of the user name is: " + oldName);
      });
      cy.get('.btn-danger').click();
      cy.get(':nth-child(2) > :nth-child(4) > .btn').should('not.exist');

      cy.log("Value Deleted");
    });
  });