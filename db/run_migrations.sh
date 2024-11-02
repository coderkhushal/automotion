#!/bin/bash

# Ensure required environment variables are set
if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_DB" ]; then
  echo "Error: POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB must be set."
  exit 1
fi

# Start PostgreSQL in the background
/usr/local/bin/docker-entrypoint.sh postgres &

# Wait until PostgreSQL is ready
until pg_isready -h localhost -U "$POSTGRES_USER"; do
  echo 'Waiting for PostgreSQL to be ready...'
  sleep 2
done

MIGRATION_DIR="/migrations"

# Run all migration files in order
for migration_file in "$MIGRATION_DIR"/*/*migration.sql; do
  echo "Running migration: $migration_file"
  PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$migration_file"
done

# Run the migration script
echo 'Running trigger sql file...'
if ! PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/1.sql; then
  echo "Error running migrations."
  exit 1
fi

# Running the seeding file
echo 'Running seeding sql file...'
if ! PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /seed.sql; then
  echo "Error running migrations."
  exit 1
fi
# Keep the PostgreSQL server running
wait
