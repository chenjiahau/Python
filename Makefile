drop_db:
	docker rm todo-db

init_alembic:
	alembic init alembic

generate_migration:
	alembic revision --autogenerate -m "Create ${table} table"

apply_migration:
	alembic upgrade head

start_server:
	uvicorn main:app --reload

.PHONY: drop_db init_alembic generate_migration apply_migration start_server