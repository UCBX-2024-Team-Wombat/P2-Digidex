# Digidex

## Description: 
- This interactive full-stack application serves as a Pokedex for useful information and fun facts, allowing users to create and organize cards that store titles, descriptions and links to external sources. Cards can be grouped into collections making it easy to categorize content. With a search function, users can find cards and collections by searching titles or key words. To create cards and collections a user must log in to ensure a secure experience. 

## User Story:
- As a user who loves fun facts and useful information,
- I want an interactive full-stack application where I can create and organize this information in the form of cards and collections,
- So that I can easily store them in one place and manage my content in an account.

## Acceptance Criteria:
- GIVEN that I am  logged in, I can create a new card by entering a title and description
- WHEN I save the card, it should be saved to my account to reference in the future
- THEN I can edit or delete the cards I’ve created
- WHEN I create a collection, I should be able to name the collection and add multiple cards to it
- THEN I can edit or delete the collections I’ve created 
- WHEN I need to find a card or collection I’ve created
- THEN I can search for a keyword or title in the search bar and it will return relevant cards or collections
- WHEN I don’t have an account, 
- THEN I can create an account by providing an email and password
- WHEN I log in with my credentials
- THEN I have access to my saved cards and collections
- WHEN I am logged out
- THEN I don’t have access to my saved cards and collections

## Table of Contents:
- [Installation](#installation)
- [Usage](#usage)
- [Resources](#resources)
- [CodeReferences](#codereferences)
- [LinkToRender](#linktorender)

## Installation:
- Bcrypt (npm i bcrypt)
- Connect-Session_sequelize (npm i connect-session-sequelize)
- Dotenv (npm i dotenv)
- Express (npm install express)
- Express-handlebars (npm i express-handlebars)
- Express-session (npm i express-session)
- Pg (npm i pg)
- Sequelize (npm install sequelize)

## Usage:
- To use this application, start by opening the terminal and typing in “npm run devstart.” Once you see the message in your terminal “Listening on PORT 3001,” open your browser and type in “localhost:3001” where you’ll be directed to the login page. If you don’t have an account, click the “sign up” link on the right side of the page. After signing up, you’ll be directed to the dashboard, where you can create cards and collections. Once you’ve added a few, you can search them by title or keyword, edit and delete them. Enjoy writing and organizing your fun facts and information! 

## Resources:
- Login.handlebars: login form group: https://getbootstrap.com/docs/4.0/components/forms/ 
- welcome.handlebars: https://www.npmjs.com/package/express-handlebars 
- Login.handler: module 14 mini project activity 28 /public/js/login.js
- User-routes.js: module 14 mini project activity 28 / controllers/ api/ user-routes
- Card-modal.handlebars: 
- https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp 
- https://www.w3schools.com/bootstrap/bootstrap_dropdowns.asp 
- Card-modal.handlebars: https://getbootstrap.com/docs/5.0/components/card/#titles-text-and-links 

- Remove input border: https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome
- Focus on field after bs.show: https://www.tutorialrepublic.com/faq/how-to-set-focus-on-input-field-or-textarea-inside-a-bootstrap-modal.php
Keydown handling: https://stackoverflow.com/questions/3369593/how-to-detect-escape-key-press 
- Typing timeout: https://bobbyhadz.com/blog/detect-when-user-stops-typing-in-javascript
- How to build a markdown blog using node.js, express, and mongodb: https://www.youtube.com/watch?v=1NrHkjlWVhM

## CodeReferences: 


## LinkToRender:
- 
