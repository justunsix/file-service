const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');

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

// Update or create XML file
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
          res.send(`Search results for ${searchTerm}: ${JSON.stringify(result)}`);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
