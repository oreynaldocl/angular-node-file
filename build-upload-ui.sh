# expected a node v14.20.0
# build angular app
IMAGE_API=oreynaldocl/upload-ui

VERSION=1

cd upload-ui
docker build -t $IMAGE_API:$VERSION -f Dockerfile-dev .
docker tag $IMAGE_API:$VERSION $IMAGE_API:latest
#docker push $IMAGE_API:$VERSION
#docker push $IMAGE_API:latest
