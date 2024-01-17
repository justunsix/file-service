const request = require('supertest');
const fs = require('fs');
const app = require('../index'); // assuming your server is exported from index.js

describe("Search XML file content", () => {
    it("should create an XML file, read it, then search for a term in it", async () => {
        const filename = 'testcasegenerated';
        const searchTerm = 'example';
        const filePath = `./xml/${filename}.xml`;
        const xmlContent = `<root><child>${searchTerm}</child></root>`;

        // Create the XML file
        await fs.promises.writeFile(filePath, xmlContent);

        // Read the XML file
        const data = await fs.promises.readFile(filePath, 'utf8');

        // Search for a term in the XML file
        const res = await request(app)
            .get(`/search/${filename}`)
            .query({ term: searchTerm });

        expect(res.statusCode).toEqual(200);
        expect(typeof res.text).toBe('string'); // assuming the response is a string
        expect(res.text).toContain(`Search results for ${searchTerm}`);
    });
});