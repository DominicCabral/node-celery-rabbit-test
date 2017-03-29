from celery import Celery
from time import sleep

app = Celery('tasks', broker='amqp://guest:guest@rabbitMQ//')
app.conf.task_queue_max_priority = 10

@app.task(bind=True)
def run(self, msg):
    sleep(2)
    print(msg)