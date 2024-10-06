# Photo Share API 

## Run

```bash
npm start
```

### Queries and mutations

Open the URL `http://localhost:4000/`, click the `Query your server` button and run:

#### Query

```json
{
  totalPhotos
}
```

```json
query listPhotos {
  allPhotos {
    id
    name
    description
    url
  }
}
```

#### Mutation

```json
mutation newPhoto {
    postPhoto(name: "sample photo") {
      id
    }
}
```

We can run the previous mutation using query variables:

```json
mutation newPhoto($name: String!, $description: String) {
    postPhoto(name: $name, description: $description)
      id
      name
      description
}
```

If we use query variables, the values are send in the lower-left corner of the Playground. Click the `Variables` option and write:

```json
{
  "name": "sample photo A",
  "description": "A sample photo for our dataset"}
}
```
