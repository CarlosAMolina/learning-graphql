build-docker-node-apollo:
	docker build -t node-apollo .

# We follow [this tutorial](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/):
pull-mongo:
	docker pull mongodb/mongodb-community-server:latest

run-mongo:
	docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

run-server:
	npm start

run-docker-node-apollo:
	docker run --rm -d --name node-apollo-container -p 4000:4000 node-apollo
