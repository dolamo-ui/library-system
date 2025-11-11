📚 Author & Book API

A simple RESTful API for managing authors and their books using Node.js, Express, and TypeScript.

1. Create Tables

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50),
    birth_year INTEGER,
    death_year INTEGER
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INTEGER NOT NULL,
    genres TEXT[],
    published_year INTEGER,
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

CREATE TABLE patrons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    borrowed_books INTEGER[]
);



✅ Features

⦁	Manage authors and books with full CRUD support.

⦁	Filter, sort, and paginate books by author.

⦁	Clear RESTful structure and responses.

⦁	Written in TypeScript with robust request validation.


⚙️ Getting Started

1. Clone the repo

git clone https://github.com/your-org/library-api.git
cd library-api

2. Install dependencies

npm install

3. Start development server

npm run dev


📘 API Endpoints


🧑‍🏫 Authors
🔹 GET /authors

Description: Get all authors
Example Response:
[
  {
    "id": 1,
    "name": "George Orwell"
  }
]


🔹 POST /authors

Description: Create a new author
Request Body:
{
  "name": "George Orwell"
}

Responses:

⦁	201 Created: Author created
⦁	400 Bad Request: Missing name
⦁	409 Conflict: Author already exists


🔹 GET /authors/:id

Description: Get a specific author by ID
Response:
{
  "id": 1,
  "name": "George Orwell"
}

.404 Not Found: Author not found


🔹 PUT /authors/:id

Description: Update an author's name
Request Body:
{
  "name": "Eric Arthur Blair"
}

Response:
{
  "id": 1,
  "name": "Eric Arthur Blair"
}

⦁	404 Not Found: Author not found


🔹 DELETE /authors/:id
Description: Delete an author by ID
Response:
{
  "message": "Author deleted"
}

⦁	404 Not Found: Author not found


🔹 GET /authors/:id/books

Description: Get books by an author, with filtering, sorting, and pagination

Query Parameters:

search (string): Filter by book title
year (number): Filter by published year
sortBy (title | year): Sort results
order (asc | desc): Sort order
page (number): Page number (default: 1)
limit (number): Items per page (default: 10)

Example:

GET /authors/1/books?search=farm&sortBy=year&order=asc&page=1&limit=2

Response:
{
  "page": 1,
  "limit": 2,
  "totalPages": 1,
  "totalItems": 1,
  "data": [
    {
      "id": 2,
      "title": "Animal Farm",
      "year": 1945,
      "authorId": 1
    }
  ]
}



📚 Books
🔹 GET /books

Description: Get all books
Response:
[
  {
    "id": 1,
    "title": "Nineteen Eighty-Four",
    "year": 1949,
    "authorId": 1
  }
]


🔹 POST /books

Description: Create a new book
Request Body:
{
  "title": "Animal Farm",
  "year": 1945,
  "authorId": 1
}

Responses:

⦁	201 Created
⦁	400 Bad Request
⦁	409 Conflict: Duplicate title for the same author


🔹 GET /books/:id

Description: Get a specific book by ID
Response:
{
  "id": 1,
  "title": "Nineteen Eighty-Four",
  "year": 1949,
  "authorId": 1
}

⦁	404 Not Found: Book not found


🔹 PUT /books/:id

Description: Update a book by ID
Request Body:
{
  "title": "Homage to Catalonia",
  "year": 2023,
  "authorId": 1
}

⦁	200 OK: Updated book
⦁	404 Not Found: Book not found


🔹 DELETE /books/:id

Description: Delete a book by ID
Response:
{
  "message": "Book deleted"
}

⦁	404 Not Found: Book not found

❗ Error Responses
| Status | Meaning                          |
| ------ | -------------------------------- |
| 400    | Bad Request                      |
| 404    | Not Found                        |
| 409    | Conflict (e.g., duplicate entry) |


🧪 Testing

You can test endpoints using tools like:

⦁	Postman

