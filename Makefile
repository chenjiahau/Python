APP=core

createapp:
		docker-compose exec backend sh -c "python manage.py startapp ${APP}"

firstmigration:
		docker-compose exec backend sh -c "python manage.py migrate"

createsuperuser:
		docker-compose exec backend sh -c "python manage.py createsuperuser"

makemigrations:
		docker-compose exec backend sh -c "python manage.py makemigrations ${APP}"

migrate:
		docker-compose exec backend sh -c "python manage.py migrate ${APP}"

.PHONY: migrate createsuperuser makemigrations