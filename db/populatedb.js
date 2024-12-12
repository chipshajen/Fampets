const { Client } = require('pg')
require('dotenv').config()

const SQL = `
    CREATE TABLE IF NOT EXISTS family (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS species (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS breed (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL,
        speciesId INT NOT NULL,
        CONSTRAINT fk_breed FOREIGN KEY (speciesId) REFERENCES species(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE 
    );

    CREATE TABLE IF NOT EXISTS color (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS pet (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(100),
        familyId INT,
        breedId INT,
        colorId INT,
        CONSTRAINT fk_family FOREIGN KEY (familyId) REFERENCES family(id)
        ON DELETE SET NULL,
        CONSTRAINT fk_breed FOREIGN KEY (breedId) REFERENCES breed(id)
        ON DELETE SET NULL,
        CONSTRAINT fk_color FOREIGN KEY (colorId) REFERENCES color(id)
        ON DELETE SET NULL
    );

    
`
//TODO
//Make populate script take a argv
//Remove the SSL thing
async function populate() {

    const client = new Client({
        connectionString: process.env.DB_STRING
    })

    try {
        console.log('Starting population of db...')

        await client.connect()
        console.log('Running Query...')
        await client.query(SQL)
        console.log('Done')

        console.log('Inserting into species...');
        await client.query(`
            INSERT INTO species(name)
            VALUES
                ('Cat'),
                ('Dog')
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('Inserting into breed...');
        await client.query(`
            INSERT INTO breed(name, speciesId)
            VALUES
                ('Bengal', 1),
                ('Siamese', 1),
                ('Papillon', 2),
                ('Dalmatian', 2);
        `);

        console.log('Inserting into family...');
        await client.query(`
            INSERT INTO family(name)
            VALUES
                ('Brittany & Sebastian Widlund'),
                ('Tom Byerley'),
                ('Meredith Parker');
        `);

        console.log('Inserting into color...');
        await client.query(`
            INSERT INTO color(name)
            VALUES
                ('Mink'),
                ('Black'),
                ('White'),
                ('Orange')
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('Inserting into pet...');
        await client.query(`
            INSERT INTO pet(name, description, familyId, breedId, colorId)
            VALUES
                ('Zima', 'So sweet', 1, 1, 1),
                ('Zuri', 'So headbutty', 1, 1, 1),
                ('Zoey', 'So pistolly', 2, 3, 3),
                ('Cupid', 'Loves carrots', 2, 3, 4);
        `);

    } catch (err) {
        console.log('Something went wrong')
        console.log(err)
    } finally {
        await client.end()
    }
}

populate()

// INSERT INTO family(name)
//     VALUES
//         ('Brittany & Sebastian Widlund'),
//         ('Tom Byerley'),
//         ('Meredith Parker');

//     INSERT INTO species(name)
//     VALUES
//         ('Cat'),
//         ('Dog')
//     ON CONFLICT (name) DO NOTHING;

//     INSERT INTO breed(name, speciesId)
//     VALUES
//         ('Bengal', 1),
//         ('Siamese', 1),
//         ('Papillon', 2),
//         ('Dalmatian', 2);

//     INSERT INTO color(name)
//     VALUES
//         ('Mink'),
//         ('Black'),
//         ('White'),
//         ('Orange')
//     ON CONFLICT (name) DO NOTHING;

//     INSERT INTO pet(name, description, familyId, breedId, colorId)
//     VALUES
//         ('Zima', 'So sweet', 1, 1, 1),
//         ('Zuri', 'So headbutty', 1, 1, 1),
//         ('Zoey', 'So pistolly', 2, 3, 3),
//         ('Cupid', 'Loves carrots', 2, 3, 4);