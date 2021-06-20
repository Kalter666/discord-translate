#!/bin/bash

docker-compose -f dev.compose.yml down
docker-compose -f dev.compose.yml up -d --build