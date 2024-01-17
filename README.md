# File Service

Web service to manage XML files by reading, updating, and searching text in the files using Node.js and Express.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Node.js package manager

## Getting Started

- Download or git clone the repository:
- Navigate to the project directory

- Install dependencies `npm install`

## Running the Service

Start the web service by running the following command:

`node index.js`

The service will be accessible at <http://localhost:3000>.

## Usage

### Reading files

To read the content of a file, make a GET request to:

`http://localhost:3000/read/:filename`

### Updating or Creating XML

To update or create an file, make a POST request to:

`http://localhost:3000/update/:filename`

Replace :filename with the desired file name. Include the content in the request body. The update will overwrite an existing file.

### Searching XML Content

To search the content of an XML file, make a GET request to:

`http://localhost:3000/search/:filename?term=your-search-term`

Replace `:filename` with the desired XML file name (for example `test` for search an xml file called `test.xml`) and `your-search-term` with the term you want to search for.

### Example

For the xml file called `test.xml`

#### Read

GET or put in your browser: `http://localhost:3000/read/test`. Note the file is an xml file but the GET request does not have the xml file extension.

#### Search

GET or put in your browser: `http://localhost:3000/search/test?term=Test`

## Testing the Web Service

- Make sure the web service is running with `node index.js`
- Run `npm test`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## How this Repository was Built

```sh
# Initialize as a new Node.js project
npm init -y
# Install Node.js with Express for JavaScript
npm install express
# Install web service dependencies
npm install xml2js
# Install testing dependencies for development environments only
npm install --save-dev jest supertest
# Create a directory called xml to store your files
mkdir xml
```

Tested using Node version 21.6.0
