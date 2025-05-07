drop_db:
	docker rm todo-db

init_alembic:
	alembic init alembic

generate_migration:
	alembic revision --autogenerate -m "${message}"

migrate_all_to_head:
	alembic upgrade head

migrate_to_revision:
	alembic upgrade ${revision}

downgrade_to_revision:
	alembic downgrade ${revision}

start_server:
	uvicorn main:app --reload

.PHONY: drop_db init_alembic generate_migration apply_migration start_server