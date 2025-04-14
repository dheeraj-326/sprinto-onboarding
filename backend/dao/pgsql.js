import { Sequelize } from "sequelize";

// While building this I noticed sequelize initialization was happening before the env was loaded.
// This pattern of init.js and gatekeeping the sequelize initialization is a workaround to ensure 
// that the env is loaded before sequelize is initialized.
// I am assuming that nodejs builds a dependency graph of modules and initializes them first before executing any code we have written.
// This is why we need to initialize the env before initializing sequelize.

let sequelize = null;

function init() {
    sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: "postgres",
        logging: console.log,
        define: {
          freezeTableName: true,
        }
      });
}

function getSequelize() {
    if (sequelize === null) {
        init();
    }
    return sequelize;
}

export default getSequelize;