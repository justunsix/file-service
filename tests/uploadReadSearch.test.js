const axios = require('axios');
const cheerio = require('cheerio');

// Define the XML content
const xmlContent = `
<root>
  <test>Test content</test>
</root>
`;

// Define the filename
const filename = 'test';

// Define the test term
const testTerm = 'Test content';

// Define the test
test('Test term is found in XML content', () => {
  // Make a POST request to upload the XML file
  return axios.post(`http://localhost:3000/update/${filename}`, xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
  .then(() => {
    // Make a GET request to read the XML file
    return axios.get(`http://localhost:3000/read/${filename}`);
  })
  .then((response) => {
    // Parse the XML content
    const $ = cheerio.load(response.data);

    // Search for the test term
    const found = $('test').text() === testTerm;

    // Expect the test term to be found
    expect(found).toBe(true);
  })
  .catch((error) => {
    // Fail the test if an error occurs
    throw error;
  });
});