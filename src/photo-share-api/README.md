# Photo Share API 

## Run

```bash
npm start
```

### Paths

- `/`: homepage.
- `/graphql`: GraphQL endpoint.
- `/playground`: GraphQL Playground.

### Queries and mutations

Open the URL `http://localhost:4000/`, click the `Query your server` button and run:

#### Query

```json
{
  totalPhotos
}
```

```json
query photos {
  allPhotos {
    id
    url
    name
    description
    category
    postedBy {
        name
    }
    taggedUsers {
        name
    }
    created
  }
}
```

#### Mutation

We use query variables:

```json
mutation newPhoto($input: PostPhotoInput!) {
  postPhoto(input:$input) {
    id
    name
    url
    description
    category
  }
}
```

If we use query variables, the values are send in the lower-left corner of the Playground. Click the `Variables` option and write:

```json
{
  "input": {
    "name": "sample photo A",
    "description": "A sample photo for our dataset"
  }
}
```
