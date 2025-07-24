API_IMAGE_NAME=node-apollo-api
API_CONTAINER_NAME=$(API_IMAGE_NAME)-container

build-docker-node-apollo:
	docker build -t $(API_IMAGE_NAME) .

# We follow [this tutorial](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/):
pull-mongo:
	docker pull mongodb/mongodb-community-server:latest

run-mongo:
	docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

run-server:
	npm start

run-docker-node-apollo:
	docker run --rm -d --name $(API_CONTAINER_NAME) -p 4000:4000 $(API_IMAGE_NAME)

stop-docker:
	docker stop $(shell docker ps -aq)
