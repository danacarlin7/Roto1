clear

#Stop Docker Compose
# docker-compose down
#
# #build
# time docker-compose build | tee docker-build.log
#
# docker tag rotopros-web registry.gitlab.com/anonymous-coder/rotoprosweb:beta
# docker push registry.gitlab.com/anonymous-coder/rotoprosweb:beta

#Check Docker Images
docker images | grep rotoprosweb

echo "Docker image updated"

#Start
# docker-compose up
