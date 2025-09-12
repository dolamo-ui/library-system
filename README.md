📚 Author \& Book API



A simple RESTful API for managing authors and their books using Node.js, Express, and TypeScript.



✅ Step-by-Step Instructions



1\. ✅ Install dependencies



npm install



2\. ▶️ Start the development server



npm run dev



This should output something like:

\[INFO] Starting development server...

Library API running at http://localhost:3000



📘 Endpoints



🧑‍🏫 Authors



GET /authors

GET http://localhost:3000/authors

Description: Get all authors.

Response: 200 OK



\[

&nbsp; {

&nbsp;   "id": 1,

&nbsp;   "name": "George Orwell"

&nbsp; }

]





POST /authors

POST http://localhost:3000/authors

Description: Create a new author.

Request Body: 

{

&nbsp; "name": "George Orwell"

}



Responses:

201 Created: Author created



400 Bad Request: Missing name



409 Conflict: Author already exists







GET /authors/:id

http://localhost:3000/authors/1

Description: Get an author by ID

Response:

200 OK: Author object



404 Not Found: Author not found





🔹 PUT /authors/:id

PUT http://localhost:3000/authors/1

Description: Update an author's name.

Request Body:

{

&nbsp; "name": "Eric Arthur Blair"

}

Response: Updated author or 404 Not Found





🔹 DELETE /authors/:id

DELETE http://localhost:3000/authors/1

Description: Delete an author by ID.

Response: Deleted author or 404 Not Found





🔹 GET /authors/:id/books

Description: Get all books by a specific author.

Supports:



search: Filter by book title



year: Filter by published year



sortBy: title or year



order: asc or desc



page: Page number



limit: Items per page



GET /authors/1/books?search=farm\&sortBy=year\&order=asc\&page=1\&limit=2



Response:

{

&nbsp; "page": 1,

&nbsp; "limit": 2,

&nbsp; "totalPages": 1,

&nbsp; "totalItems": 1,

&nbsp; "data": \[

&nbsp;   {

&nbsp;     "id": 2,

&nbsp;     "title": "Animal Farm",

&nbsp;     "year": 1945,

&nbsp;     "authorId": 1

&nbsp;   }

&nbsp; ]

}



GET http://localhost:3000/authors/1/books?search=farm

Response:

{

&nbsp; "page": 1,

&nbsp; "limit": 10,

&nbsp; "totalPages": 1,

&nbsp; "totalItems": 1,

&nbsp; "data": \[

&nbsp;   {

&nbsp;     "title": "Animal Farm",

&nbsp;     "year": 1945,

&nbsp;     "authorId": 1,

&nbsp;     "id": 2

&nbsp;   }

&nbsp; ]

}



GET http://localhost:3000/authors/1/books?sortBy=year\&order=desc



{

&nbsp; "page": 1,

&nbsp; "limit": 10,

&nbsp; "totalPages": 1,

&nbsp; "totalItems": 3,

&nbsp; "data": \[

&nbsp;   {

&nbsp;     "id": 1,

&nbsp;     "title": "Nineteen Eighty-Four",

&nbsp;     "year": 1949,

&nbsp;     "authorId": 1

&nbsp;   },

&nbsp;   {

&nbsp;     "id": 2,

&nbsp;     "title": "Animal Farm",

&nbsp;     "year": 1945,

&nbsp;     "authorId": 1

&nbsp;   },

&nbsp;   {

&nbsp;     "id": 3,

&nbsp;     "title": "Homage to Catalonia",

&nbsp;     "year": 1938,

&nbsp;     "authorId": 1

&nbsp;   }

&nbsp; ]

}





**📚 Books**

**🔹 GET /books**

**GET http://localhost:3000/books**

**Description: Get all books.**

**Response: List of books.**

{

      "id": 1,

      "title": "Nineteen Eighty-Four",

      "year": 1949,

      "authorId": 1

    },

 }



🔹 POST /books

**POST http://localhost:3000/books**

Description: Create a new book.

Request Body:

{

&nbsp; "title": "Animal Farm",

&nbsp; "year": 1945,

&nbsp; "authorId": 1

}



Responses:

201 Created

400 Bad Request

409 Conflict: Duplicate title for the same author



🔹 GET /books/:id

**GET http://localhost:3000/books/1**

Description: Get a book by ID.



{

      "id": 1,

      "title": "Nineteen Eighty-Four",

      "year": 1949,

      "authorId": 1

    },

 }





🔹 PUT /books/:id

**PUT http://localhost:3000/books/1**

Description: Update a book.

Request Body:

{

&nbsp; "title": "Homage to Catalonia",

&nbsp; "year": 2023,

&nbsp; "authorId": 1

}



🔹 DELETE /books/:id

DELETE **http://localhost:3000/books/1**

Description: Delete a book by ID.



❗ Error Responses

| Status | Meaning                    |

| ------ | -------------------------- |

| 400    | Bad Request                |

| 404    | Not Found                  |

| 409    | Conflict (e.g., duplicate) |



