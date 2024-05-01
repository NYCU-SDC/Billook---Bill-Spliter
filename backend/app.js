import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { print, buildSchema } from 'graphql';
import dotenv from 'dotenv';
import models from './models/index.js';
import typedef from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

dotenv.config();

// Create an express app
const app = express();
const port = process.env.PORT || 5000;

// Create a GraphQL schema
const graphqlTypedef = typedef;
const graphqlSchema = buildSchema(print(graphqlTypedef))
const graphqlResolvers = resolvers;

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true, // Enable GraphiQL when accessed via browser
}));

const MONGO_URI=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
app.get('/get_all_user', async (req, res) => {
    try{
        const users = await models.User.find();
        res.json(users);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post('/create_user', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new models.User({ username, password, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port localhost:${port}`);
            console.log(`Visit http://localhost:${port}/`);
        });
    })
    .catch(err => {
        console.log(err);
    });