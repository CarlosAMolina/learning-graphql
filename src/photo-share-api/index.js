const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { GraphQLScalarType } = require('graphql')

var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

var _id = 0
var users  = [
    { "githubLogin": "mHattrup", "name": "Mike Hattrup" },
    { "githubLogin": "gPlake", "name": "Glen Plake" },
    { "githubLogin": "sSchmidt", "name": "Scot Schmidt" },
]
var photos = [
    {
        "id": "1",
        "name": "Dropping the Heart Chute",
        "description": "The heart chute is one of my favorite chutes",
        "category": "ACTION",
        "githubUser": "gPlake",
        "created": "3-28-1977"
    },
    {
        "id": "2",
        "name": "Enjoying the sunshine",
        "category": "SELFIE",
        "githubUser": "sSchmidt",
        "created": "1-2-1985"
    },
    {
        "id": "3",
        "name": "Gunbarrel 25",
        "description": "25 laps of gunbarrel today",
        "category": "LANDSCAPE",
        "githubUser": "sSchmidt",
        "created": "2018-04-15T19:09:57.308Z"
    },
]
var tags = [
    { "photoID": "1", "userID": "gPlake" },
    { "photoID": "2", "userID": "sSchmidt" },
    { "photoID": "2", "userID": "mHattrup" },
    { "photoID": "2", "userID": "gPlake" },
]

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        // parent: the parent of the `postPhoto` resolver is a Mutation,
        // it's the first argument sent to the resolver.
        // args: is an object with the fields sent to this operation.
        postPhoto(parent, args) {
            var newPhoto = {
                id: _id++,
                ...args.input,
                created: new Date()
            }
            photos.push(newPhoto)
            return newPhoto
        }
    },
    // `Photo` is a trivial resolver.
    // The `parent` is the `Photo` object that is being resolved.
    // Every field in our GraphQL schema can map to a resolver.
    Photo: {
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser)
        },
        taggedUsers: parent => tags
            // Returns an array of tags that only contain the current photo
            .filter(tag => tag.photoID === parent.id)
            // Converts the array of tags into an array o userIDs
            .map(tag => tag.userID)
            // Converts array of userIDs into an array of user objects
            .map(userID => users.find(u => u.githubLogin == userID))
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser === parent.githubLogin)
        },
        inPhotos: parent => tags
            // Returns an array of tags that only contain the current user
            .fiter(tag => tag.userID === parent.id)
            // Converts the array of tags into an array of photoIDs
            .map(tag => tag.photoID)
            // Converts array of photoIDs into an array of photo objects
            .map(photoID => photos.find(p => p.id === photoID))
    },
    // - parseValue: required when using `query variables`. Whatever paseValue returns is
    // passed to the resolver in the `args` argument.
    // - serialize: converts the value to return in the response.
    // - parseLiteral: when an argument is not being passed as a query variable, we obtain
    // it from the query after it has been parsed into an abstract syntax tree (AST).
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value.',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })
}

var app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app })
app.get('/', (req,res) => res.end('Welcome to the PhotoShare API'))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.listen({ port: 4000 }, () =>
    console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
)
