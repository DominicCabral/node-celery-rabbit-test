from celery import Celery
from time import sleep

app = Celery('tasks', broker='amqp://guest:guest@rabbitMQ//')

@app.task
def run(msg):
    sleep(2)
    print(msg)