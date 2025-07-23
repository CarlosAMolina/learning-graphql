const { ApolloServer } = require('apollo-server-express')
const { readFileSync } = require('fs')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const resolvers = require('./resolvers')

var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

var app = express()

// We send to the server the schema (typeDefs) and resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers
})

async function start() {
    await server.start()
    server.applyMiddleware({ app })
    app.get('/', (req,res) => res.end('Welcome to the PhotoShare API'))
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
    app.listen({ port: 4000 }, () =>
        console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
    )
}

start()
