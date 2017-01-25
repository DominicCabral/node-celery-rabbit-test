var celery = require('node-celery');
var express = require('express');
var app = express();
var client = celery.createClient({
    CELERY_BROKER_URL: 'amqp://guest:guest@rabbitMQ//',
    CELERY_ROUTES: {
        'worker.run': {
            queue: 'tasks'
        }
    },
    IGNORE_RESULT: true
});

app.listen(80, function () {
  console.log('app listening on port 80')
})

//visit 0.0.0.0 in browser to call
client.on('connect', () => {
    app.get('/', sendMessageToWorker);
});

client.on('error', function (err) {
    console.log(err);
});


function sendMessageToWorker(req,res) {
    const message = { hello: 'wabbit' };

    var task = client.createTask("worker.run");
    task.call([message]);
    res.send('sent');
}

