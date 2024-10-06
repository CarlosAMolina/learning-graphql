const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }

    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`

var photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length
    },

    Mutation: {
        // parent: the parent of the `postPhoto` resolver is a Mutation,
        // it's the first argument sent to the resolver.
        // args: is an object with the fields sent to this operation.
        postPhoto(parent, args) {
            photos.push(args)
            return true
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
    .listen()
    .then(({url}) => console.log(`GraphQL Service running on ${url}`))
