* check if image rabbitmq already exists?
```
docker image ls
```

*if image rabbitmq did NOT exists*

* to create image `rabbitmq`
```
docker pull rabbitmq
```

* check if volume `rabbitmq_data` exists
```
docker volume ls
```

* to remove volume
```
docker volume rm rabbitmq_data
```

* to create volume
```
docker volume create rabbitmq_data 
```

* to run image `rabbitmq` in detach (in background) mode and expose port(s) *15672* adn *5672*, attach volume rabbitmq_data to `var/lib/rabbitmq/mnesia/rabbit@my-rabbit` with `@my-rabbit` is host (could be change)
```
docker run --name rabbitmq --hostname my-rabbit -p 15672:15672 -p 5672:5672 -v rabbitmq_data:/var/lib/rabbitmq/mnesia/rabbit@my-rabbit -d rabbitmq:3 
```

* check if the rabbitmq is running, you can visit
```
http://localhost:15672
```

* to verify the publish and subscribe function, you can run receive.js and send.js in different terminal (following https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html )

* run `receive.js`
```
node receive.js
```

* run `send.js`
```
node send.js Your message goes here
```

* to start container `rabbitmq`
```
docker container start rabbitmq
```

* to restart container `rabbitmq`
```
docker container restart rabbitmq
```

* to stop container `rabbitmq`
```
docker container stop rabbitmq
```

* to remove container `rabbitmq` (you have reinitiate container from rabbitmq image again in order to start again after container is removed)
```
docker container rm rabbitmq
```