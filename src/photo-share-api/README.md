# Photo Share API 

## Develop

```bash
npm install
make run-server
```

## Run

```bash
make build-docker-node-apollo
make run-docker-node-apollo
```

## API

### Paths

- `/`: homepage.
- `/graphql`: GraphQL endpoint.
- `/playground`: GraphQL Playground.

To run queries and mutations, open the URL `http://localhost:4000/` and click the `Query your server` button.

### Query

Return count:

```json
{
  totalPhotos
}
```

Return all photos:

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

Filter by date.

- Using query variables:

    ```json
    query recentPhotos($after: DateTime) {
      allPhotos(after: $after) {
        url
        name
        created
      }
    }
    ```

    With query variables, the values are send in the lower-left corner of the Playground. Click the `Variables` option and write:

    ```json
    {
      "after": "2000-01-03"
    }
    ```

- Using the date string directly to the query itself:

    ```json
    query {
      allPhotos(after: "2000-01-03") {
        url
        name
        created
      }
    }
    ```

### Mutation

We use query variables:

```json
mutation newPhoto($input: PostPhotoInput!) {
  postPhoto(input:$input) {
    id
    name
    url
    description
    category
    created
  }
}
```

Send query variables values in the lower-left corner of the Playground (explained above):

```json
{
  "input": {
    "name": "sample photo A",
    "description": "A sample photo for our dataset"
  }
}
```
