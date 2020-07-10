// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const { MailSlurp } = require("mailslurp-client");
const key = "deb1d87fcb1ab8ad44eb998ae4a05016ced6fc9afe702f4eb095df3a5fbf9d64";

Cypress.Commands.add("newEmailAddress", () => {
  // instantiate MailSlurp
  const mailslurp = new MailSlurp({ apiKey: key });
  // return { id, emailAddress } or a new randomly generated inbox
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  const mailslurp = new MailSlurp({ apiKey: key });
  return mailslurp.waitForLatestEmail(inboxId);
});

Cypress.Commands.add("removeInbox", (inboxId) => {
  const mailslurp = new MailSlurp({ apiKey: key });
  return mailslurp.deleteInbox(inboxId);
});
