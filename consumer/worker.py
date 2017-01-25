from celery import Celery
from time import sleep

app = Celery('tasks', broker='amqp://guest:guest@rabbitMQ//')
app.conf.CELERYD_PREFETCH_MULTIPLIER = 1

@app.task(bind=True)
def run(self, msg):
    sleep(1)
    print(msg)