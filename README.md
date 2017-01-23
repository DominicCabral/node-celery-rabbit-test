# node-celery-rabbit-test
Test environment using docker-compose to simulate a pub-sub pattern between Node.js &lt;-> RabbitMQ &lt;-> Python-Celery

## Usage

`docker-compose build`

`docker-compose up`

## What it does

`./worker` uses Node.js, module node-celery to publish a message to RabbitMQ at 1 message/ms
`./consumer` uses python celery to print the message at 1 message / 2 seconds

This will fill the RabbitMQ which can be seen at `0.0.0.0:15672` with name: `guest` pass: `guest`

