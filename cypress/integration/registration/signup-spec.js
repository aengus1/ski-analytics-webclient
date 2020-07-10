/* global cy */

describe('Navigate to register page and create a new account', () => {
  it('loads the registration page', () => {
    cy.visit('http://localhost:4200');
    cy.get('*[data-test="register"]').click();
    cy.url().should('include', '/signup');
  });

  it('displays an error message on invalid email', () => {
    cy.fixture('auth-users.json').as('users').then((json) => {
      cy.get('*[data-test="first-name"]')
        .type(json[1].firstName);
      cy.get('*[data-test="last-name"]')
        .type(json[1].lastName);
      cy.get('*[data-test="email"]')
        .type(json[1].email);
      cy.get('*[data-test="password"]')
        .type(json[1].password);
      cy.get('*[data-test="password-confirm"]')
        .type(json[1].password);

      cy.get('*[data-test="validation-invalid-email"]')
        .should('be.visible', true);
    });
  });

  it('displays an error message on unmatched password', () => {
    cy.fixture('auth-users.json').as('users').then((json) => {
      cy.get('*[data-test="email"]')
        .clear()
        .type(json[2].email);
      cy.get('*[data-test="password"]')
        .clear()
        .type(json[2].password);
      cy.get('*[data-test="password-confirm"]')
        .clear()
        .type("unmatchingPassword123");

      cy.get('*[data-test="validation-matching-password"]')
        .should('be.visible', true);
    });
  });

  it('displays an error message on invalid password', () => {
    cy.fixture('auth-users.json').as('users').then((json) => {
      cy.get('*[data-test="password"]')
        .clear()
        .type(json[3].password);
      cy.get('*[data-test="password-confirm"]')
        .clear()
        .type(json[3].password);

      cy.get('*[data-test="validation-invalid-password"]')
        .should('be.visible', true);
    });
  });

  let inboxId;
  let emailAddress;
  let code;

  it('successfully registers a new user', () => {
    cy.newEmailAddress().then(email => {
      console.log('email = ' + email);
      // save the inboxId for later checking the emails
      inboxId = email.id
      emailAddress = email.emailAddress;

      cy.get('*[data-test="email"]').clear().type(emailAddress);
      cy.fixture('auth-users.json').as('users').then((json) => {
        cy.get('*[data-test="password"]')
          .clear()
          .type(json[2].password);
        cy.get('*[data-test="password-confirm"]')
          .clear()
          .type(json[2].password);

        cy.get('*[data-test="submit"]')
          .should('be.enabled', true)
          .click();
      });
    });
  });

  it('sends a confirmation code email', () => {
    cy.waitForLatestEmail(inboxId).then(email => {
      assert.isDefined(email);
      assert.strictEqual(/Your confirmation code is/.test(email.body), true);
      code = /([0-9]{6})$/.exec(email.body)[1];
    });
  });

  it('can enter confirmation code and confirm user', () => {
    assert.isDefined(code);
    cy.get('*[data-test="confirmation-code"]').type(code);
    cy.get('*[data-test="confirmation-submit"]').click();
  });


  it('can navigate directly to login page', () => {
    cy.get('*[data-test="button-goto-login"]').click();
    cy.url().should('include', '/signin');
  });

  it('displays an error message on incorrect password', () => {
    cy.visit('http://localhost:4200');

    cy.url().should('include', '/signin')

    cy.fixture('auth-users.json').as('users').then((json) => {
      cy.get('*[data-test="email"]')
        .type(json[0].email)
        .should('have.value', 'aengusmccullough@hotmail.com');

      cy.get('*[data-test="password"]')
        .type(json[0].password)
        .should('have.value', json[0].password);

      cy.get('*[data-test="submit"]')
        .click();

      cy.get('*[data-test="errorMessage"]')
        .should('contain.text', 'Incorrect username or password');
    });
  });

  it('can sign in with newly created account', () => {
    cy.fixture('auth-users.json').as('users').then((json) => {
      cy.get('*[data-test="email"]')
        .clear()
        .type(emailAddress)
        .should('have.value', emailAddress);
      cy.get('*[data-test="password"]')
        .clear()
        .type(json[2].password);

      cy.get('*[data-test="submit"]').click();

      cy.window().then(win => {
        const tokenExp = win.sessionStorage.getItem('tokenExp');
        cy.wrap(tokenExp).should('exist'); // or 'not.empty'

        const userId = win.sessionStorage.getItem('userId');
        cy.wrap(userId).should('exist');
      });
    });
  });

  after(() => {
    cy.removeInbox(inboxId);
  })
});

