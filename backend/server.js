import { ApolloServer } from '@apollo/server';
import { typeDefs } from './graphql/schemas/schema.js';
import { resolvers } from './graphql/resolvers/resolvers.js';
import getSequelize from "./dao/pgsql.js";
import { initTables } from "./dao/models.js";
import { expressMiddleware } from '@apollo/server/express4';
import graphqlPlayground from 'graphql-playground-middleware-express';
import express from 'express';
import cors from 'cors';
// Load environment variables

async function startServer() {
    const sequelize = getSequelize();
    try {
        console.log("Hello World");
        const app = express();
        const server = new ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
            introspection: true,
            playground: true
        });
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
        await initTables();
        const url = `http://${process.env.HOST}:${process.env.PORT}`;
        await server.start();
        app.use(cors({
            origin: 'http://localhost:3001'
        }));
        app.use('/graphql', express.json(), expressMiddleware(server));
        const appServer = app.listen({ port: process.env.PORT }, () =>
            console.log(`🚀 Server ready at ${url}`)
        );

        const shutdown = async () => {
            console.log('Shutting down server');
            appServer.close(async () => {
                console.log('Express server stopped');
                await sequelize.close();
                console.log('Sequelize closed');
            })
        }

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
        
    } catch (error) {
        console.error("Error while initializing server: ", error);
    }
}

export default startServer;
