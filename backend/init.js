import dotenv from "dotenv";
import path from 'path';
import { createRequire } from 'module';

// const mainPath = process.argv[1];
// const rootPath = mainPath.slice(0, mainPath.length - 'index.js'.length)
// moduleAlias.addAliases({
//     '@': rootPath,
//     '@dao': path.join(rootPath, 'dao'),
//     '@services': path.join(rootPath, 'services'),
//     '@graphql': path.join(rootPath, 'graphql')
// });

console.log("Module aliases initialized");

dotenv.config({ path: "./.env" });
process.env.DEBUG = 'sequelize:sql:parameters';
// While building this I noticed sequelize initialization was happening before the env was loaded.
// This is a workaround to ensure that the env is loaded before sequelize is initialized.
// I am assuming that nodejs builds a dependency graph of modules and initializes them first before executing any code we have written.
// This is why we need to initialize the env before initializing sequelize.
function init() {
    console.log(`PG_HOST: ${process.env.PG_HOST}:${process.env.PG_PORT} PG_DATABASE: ${process.env.PG_DATABASE} PG_USER: ${process.env.PG_USER}`);
}

export default init;