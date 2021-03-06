# expected a node v14.20.0
# build angular app
IMAGE_API=oreynaldocl/upload-ui

VERSION=2

cd upload-ui
npm i
npm run build:prod
docker build -t $IMAGE_API:$VERSION -f Dockerfile-dev .
docker tag $IMAGE_API:$VERSION $IMAGE_API:latest
docker push $IMAGE_API:$VERSION
docker push $IMAGE_API:latest
