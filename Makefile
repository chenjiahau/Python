APP=core

create_app:
		docker-compose exec server sh -c "python manage.py startapp ${APP}"

migration:
		docker-compose exec server sh -c "python manage.py migrate"

make_migrations:
		docker-compose exec server sh -c "python manage.py makemigrations ${APP}"

create_superuser:
		docker-compose exec server sh -c "python manage.py createsuperuser"

.PHONY: create_app migration make_migrations create_superuser