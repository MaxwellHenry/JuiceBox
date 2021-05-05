// db/seed.js

const {
  client,
  getAllUsers
} = require('./index');



async function dropTables() {
  try {
    console.log("Dropping tables...");

    await client.query(`
        DROP TABLE IF EXISTS users;
      `);

    console.log("Tables dropped!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Building tables...");

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
      `);

    console.log("Tables built!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

// new function, should attempt to create a few users
async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({ username: 'albert', password: 'bertie99' });
    const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });
    console.log(albert);

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createUser({ username, password }) {
  try {
    const result = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);

    return result;
  } catch (error) {
    throw error;
  }
}


// then modify rebuildDB to call our new function
async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());