const fs = require('fs');
const faker = require('faker');

// Create a write stream to save the insert statements to a file
const outputFile = 'insert_statements.sql';
const writeStream = fs.createWriteStream(outputFile);

// Generate and save 100 random users as insert statements
for (let i = 0; i < 100; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordHash = faker.random.alphaNumeric(64); // Replace with your password hashing logic
    const createdAt = faker.date.past(1).toISOString().replace('T', ' ').replace(/\..+/, '');

    // Build the insert statement
    const insertStatement = `INSERT INTO core_users (name, email, password, passwordHash, createdAt) VALUES ('${name}', '${email}', '${password}', '${passwordHash}', '${createdAt}');\n`;

    // Write the insert statement to the output file
    writeStream.write(insertStatement);
}

// Close the output file stream
writeStream.end();

console.log(`Insert statements have been saved to ${outputFile}`);
