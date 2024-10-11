N=1
# make migrateup N
# make migratedown N
# make migrateforce N

createdb:
	docker exec -it server-db-todo createdb --username=todo --owner=todo todo

dropdb:
	docker exec -it server-db-todo dropdb todo -U todo

.PHONY: postgres createdb dropdb

