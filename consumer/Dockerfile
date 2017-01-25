FROM python:3
RUN adduser worker
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

ADD . /usr/src/app
USER worker
CMD ["celery","-A","worker","-Q","tasks","worker","-c","1"]