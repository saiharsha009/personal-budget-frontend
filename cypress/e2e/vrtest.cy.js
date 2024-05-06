describe('Login Page Visual Test', () => {
    it('should display the login page correctly', () => {
      // Set the test name and the browser configuration
      cy.eyesOpen({
        appName: 'React App',
        testName: 'Login Page Test',
        browser: { width: 800, height: 600, name: 'chrome' }
      });
  
      // Visit the login page
      cy.visit('/login');
  
      // Optionally, you can add actions like clicking or filling out the form
      cy.get('input[type="email"]').type('123@gmail.com');
      cy.get('input[type="password"]').type('123');
      
      // Take a screenshot for visual regression
      cy.eyesCheckWindow('Login Page View');
  
      // End the test
      cy.eyesClose();
    });
  });
  