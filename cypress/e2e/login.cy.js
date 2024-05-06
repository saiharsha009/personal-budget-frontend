// login.spec.js

describe('Login component', () => {
  beforeEach(() => {
    cy.visit('https://personal-budget-frontend-iota.vercel.app/signin#'); // Assuming your login component is located at the root route
  });

  it('should display validation errors if login details are incorrect', () => {
    // Click the login button without filling out the form
    cy.get('button[type="submit"]').click();
    // Expect error notification to appear
    cy.contains('User does not exist').should('be.visible');
  });

  it('displays login form by default', () => {
    cy.contains('SIGN IN').should('be.visible');
    cy.contains('SIGN UP').should('be.visible');
    cy.contains('Already have an account? Sign In').should('not.exist');
  });

  it('switches to sign up form when "Sign Up" link is clicked', () => {
    cy.contains('Dont have an account? Sign Up').click();
    cy.contains('SIGN UP').should('be.visible');
    cy.contains('SIGN IN').should('not.exist');
    cy.contains('Already have an account? Sign In').should('be.visible');
  });

  it('allows user to enter email, password, and submit the form', () => {
    // Assuming there are input fields with labels 'Email address', 'Password', and buttons with labels 'SIGN IN' and 'SIGN UP'
    cy.get('input[placeholder="Email address"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.contains('SIGN IN').click();
    // Add assertions based on expected behavior after form submission, like navigation or error messages
  });

  // Add more tests to cover other functionalities like form validation, remember me checkbox, etc.
});
