var celery = require('node-celery');

// Initialize connection to rabbitmq
var client = celery.createClient({
    CELERY_BROKER_URL: 'amqp://guest:guest@rabbitMQ//',
    CELERY_ROUTES: {
        'worker.run': {
            queue: 'tasks'
        }
    },
    IGNORE_RESULT: true
});


client.on('error', function (err) {
    console.log(err);
});

client.on('connect', function () {
    console.log('connect');

    setInterval(() => {
        console.log('try');

        var messageToRabbit = {
            hello:'wabbit'
        };

        var task = client.createTask("worker.run");
        task.call([messageToRabbit]);

    }, 100);
});

