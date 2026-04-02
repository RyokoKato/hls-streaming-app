#!/bin/bash

## Register catalog.json
echo "Register videos from catalog.json: upsert-database.py"
python upsert-database.py

## Run API appliation
echo "Run API Application: api.py"
python api.py
