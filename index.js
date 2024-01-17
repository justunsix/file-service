const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');
const readline = require('readline');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Read XML file
app.get('/read/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = `./xml/${filename}.xml`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.send(data);
    }
  });
});

// Update or create XML file, if the file exists it will be overwritten
app.post('/update/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = `./xml/${filename}.xml`;

  const xmlBuilder = new xml2js.Builder();
  const xml = xmlBuilder.buildObject(req.body);

  fs.writeFile(filePath, xml, (err) => {
    if (err) {
      res.status(500).send('Error updating file');
    } else {
      res.send('File updated successfully');
    }
  });
});

// Search XML file content
app.get('/search/:filename', (req, res) => {
  const filename = req.params.filename;
  const searchTerm = req.query.term;
  const filePath = `./xml/${filename}.xml`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      const parser = new xml2js.Parser();
      parser.parseString(data, (parseErr, result) => {
        if (parseErr) {
          res.status(500).send('Error parsing XML');
        } else {
          // Implement your search logic here based on the parsed XML    
          async function searchInFile(filePath, searchTerm) {
            const fileStream = fs.createReadStream(filePath);

            const rl = readline.createInterface({
              input: fileStream,
              crlfDelay: Infinity
            });

            let lineNumber = 0;
            let results = [];

            for await (const line of rl) {
              lineNumber++;
              if (line.includes(searchTerm)) {
                results.push({ lineNumber, line: line.toString() });
              }
            }

            return results;
          }

          searchInFile(filePath, searchTerm)
            .then(results => {
              res.send(`Search results for ${searchTerm}: ${JSON.stringify(results)}`);
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
