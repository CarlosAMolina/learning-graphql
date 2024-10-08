const { ApolloServer } = require('apollo-server')

const typeDefs = `

    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    type User {
        githubLogin: ID!
        name: String
        avatar: String
        postedPhotos: [Photo!]!
        inPhotos: [Photo!]!
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
        taggedUsers: [User!]!
    }

    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`

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
    },
    {
        "id": "2",
        "name": "Enjoying the sunshine",
        "category": "SELFIE",
        "githubUser": "sSchmidt",
    },
    {
        "id": "3",
        "name": "Gunbarrel 25",
        "description": "25 laps of gunbarrel today",
        "category": "LANDSCAPE",
        "githubUser": "sSchmidt",
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
                ...args.input
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
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
    .listen()
    .then(({url}) => console.log(`GraphQL Service running on ${url}`))
