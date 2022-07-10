# angular-nodejs-docker-compose
Angular Nodejs Local development with Docker compose 

```bash
# build with no cache
docker-compose build --no-cache
# start the services
docker-compose up
# list the services
docker-compose ps
# list the containers
docker ps
# stop services
docker-compose stop
```

## Build docker app-ui
https://dev.to/oneofthedevs/docker-angular-nginx-37e4

```bash
# build with no cache
docker build -t oreynaldocl/ang-ui:latest -f .\Dockerfile-dev .
# run
docker run -p 8000:80 -d oreynaldocl/ang-ui:latest

# NO FUNCIONA
docker run --rm -p 8000:80 -v /mnt/d/git/angular-nodejs-docker-compose/api/nginx.conf:/etc/nginx/conf.d/default.conf  oreynaldocl/ang-ui:latest 

# NO FUNCIONA in PWS, si en GITBASH https://docs.docker.com/desktop/windows/troubleshoot/#path-conversion-on-windows
cd app-ui
docker run --rm -p 8000:80 -v "/${PWD}/nginx.conf":/etc/nginx/conf.d/default.conf  oreynaldocl/ang-ui:latest 
```

## Build docker app
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
```bash
docker build . -t oreynaldocl/ang-api -f .\Dockerfile-dev

docker run --rm -p 3080:3080 -d oreynaldocl/ang-api:latest
```

## Reverse proxy
https://sep.com/blog/hosting-the-node-api-in-nginx-with-a-reverse-proxy/#:~:text=Using%20nginx,incoming%20requests%20on%20port%209000.

## Run sh in windows
https://stackoverflow.com/questions/36401147/running-sh-scripts-in-git-bash

## Change origin
https://github.com/oreynaldocl/angular-nodejs-docker-compose

copy SSH version from WEB git@github.com:oreynaldocl/angular-nodejs-docker-compose.git

```
git remote set-url origin git@github.com:oreynaldocl/angular-nodejs-docker-compose.git

git remote -v
```
https://devconnected.com/how-to-change-git-remote-origin/#Changing_Git_Remote_to_SSH

# DEPLOY
## Kubernetes documented
```shell
minikube start

kubectl apply -f .\deploy\app-ui-deployment.yaml 
kubectl delete -f .\deploy\app-ui-deployment.yaml

kubectl port-forward service/backend-api-service 3080:3080
kubectl port-forward service/app-ui-service 4201:4201
```
