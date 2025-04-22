create_db:
	docker exec -it todo createdb --username=todo --owner=todo todo

drop_db:
	docker exec -it todo dropdb todo -U todo


.PHONY: create_db drop_db