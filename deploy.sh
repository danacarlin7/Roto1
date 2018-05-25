clear

#Stop Docker Compose
docker-compose down

#build
time docker-compose build | tee docker-build.log

docker tag rotopros-web registry.gitlab.com/anonymous-coder/rotoprosweb:latest
docker push registry.gitlab.com/anonymous-coder/rotoprosweb:latest

#Check Docker Images
docker images | grep rotoprosweb


#Start
docker-compose up
