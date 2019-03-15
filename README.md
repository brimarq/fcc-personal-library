# fCC Information Security and Quality Assurance Projects: Personal Library  

- Build a full stack JavaScript app that is functionally similar to this: https://spark-cathedral.glitch.me/.  
- Working on this project will involve you writing your code on Glitch on our starter project. After completing this project you can copy your public glitch url (to the homepage of your app) into this screen to test it! Optionally you may choose to write your project on another platform but must be publicly visible for our testing.  
- Start this project on Glitch using [this link](https://glitch.com/#!/import/github/freeCodeCamp/boilerplate-project-library/) or clone [this repository](https://github.com/freeCodeCamp/boilerplate-project-library/) on GitHub. If you use Glitch, remember to save the link to your project somewhere safe.

---

1) ADD YOUR MongoDB connection string to .env without quotes as db (example: `DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`).  
2) SET NODE_ENV to `test` without quotes.  
3) You need to create all routes within `routes/api.js`.  
4) You will add any security features to `server.js`.  
5) You will create all of the functional tests in `tests/2_functional-tests.js`.  

---

## User Stories  
* [ ] 1. Nothing from my website will be cached in my client as a security measure.  
* [ ] 2. I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.  
* [ ] 3. I can **POST** a `title` to `/api/books` to add a book and returned will be the object with the `title` and a unique `_id`  
* [ ] 4. I can **GET** `/api/books` to retrieve an aray of all books containing `title`, `_id`, and `commentcount`.  
* [ ] 5. I can **GET** `/api/books/{_id}` to retrieve a single object of a book containing `title`, `_id`, and an array of `comments` (empty array if no comments present).  
* [ ] 6. I can **POST** a `comment` to `/api/books/{_id}` to add a comment to a book and returned will be the books object similar to **GET** `/api/books/{_id}`.  
* [ ] 7. I can **DELETE** `/api/books/{_id}` to delete a book from the collection. Returned will be 'delete successful' if successful.  
* [ ] 8. If I try to request a book that doesn't exist I will get a 'no book exists' message.  
* [ ] 9. I can send a **DELETE** request to `/api/books` to delete all books in the database. Returned will be 'complete delete successful' if successful.  
* [ ] 10. All 6 functional tests required are complete and passing.


