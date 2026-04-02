FROM python:3.11-slim

## Work directory
WORKDIR /app

## Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

## Source
COPY src/ .

## Flask default port
EXPOSE 5000

## Entrypoint
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

