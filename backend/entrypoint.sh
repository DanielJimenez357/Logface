#!/bin/bash

set -e

echo "ejecutando migraciones"

python3 manage.py migrate --noinput

echo "creando super usuario"
python3 manage.py createsuperuser --noinput || true

echo "migraciones completadas"

exec "$@"
