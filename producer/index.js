var celery = require('node-celery');
var importantCounter = 0;
var normalCounter = 0;

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

client.on('connect', () => {
  setInterval(sendMessageToWorker, 500);
  setInterval(sendImportantMessageToWorker, 5000);
});

client.on('error', function(err) {
  console.log(err);
});


function sendMessageToWorker() {
  const message = { normal: normalCounter };
  console.log(normalCounter)
  var task = client.createTask("worker.run");
  task.call([message], {}, { priority: 1 });
  normalCounter++;
}

function sendImportantMessageToWorker() {

  console.log('IMPORTANT', importantCounter)
  const message = { important: importantCounter };
  var task = client.createTask("worker.run");
  task.call([message], {}, { priority: 10 });
  importantCounter++;
}