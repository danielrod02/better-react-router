#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

IMAGE_TAG="17.2-alpine3.21"

docker pull postgres:$IMAGE_TAG

[ -d "$SCRIPT_DIR/pg-db-data" ] || \
echo "Creating $SCRIPT_DIR/pg-db-data" && \
    mkdir "$SCRIPT_DIR/pg-db-data" || \
    echo "Failed to create directory (maybe it already exists)"


container_name="better-remix-db"
container_exists=$(docker ps -a --filter "name=^/${container_name}$" --format "{{.Names}}")

if [ "$container_exists" == "$container_name" ]; then
    echo "Container '$container_name' already exists."
    echo ""
    echo ""
    docker start $container_name
    docker attach $container_name
else
    echo "Container '$container_name' does not exist. Creating it..."
    docker run \
        -it \
        -p 32770:5432 \
        -p 32770:5432/udp \
        --name $container_name \
        --mount "type=bind,src=${SCRIPT_DIR}/pg-db-data,dst=/var/lib/postgresql/data" \
        -e POSTGRES_USER=betterrem \
        -e POSTGRES_PASSWORD=betterpasswd \
        postgres:$IMAGE_TAG
fi