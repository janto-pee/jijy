postgres:
	docker run --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql:8.0.40-debian
	docker exec -it mysql_docker bash
	mysql -uroot -p
	# password

mongodb:
	docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest

# docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:noble
mongosh:
	docker exec -it mongodb bash
	# 		(OR)
	# docker exec -it mongodb mongosh

enterdb:
	mongosh --port 27017 --username root --password secret

	
	


dropdb:
	docker exec -it postgres12 dropdb HLS

migrateup:
	migrate -path server/db/migration -database "postgresql://root:secret@localhost:5432/HLS?sslmode=disable" -verbose up

migratedown:
	migrate -path server/db/migration -database "postgresql://root:secret@localhost:5432/HLS?sslmode=disable" -verbose down

sqlc:
	sqlc generate

.PHONY: postgres createdb dropdb migrateup migratedown generate