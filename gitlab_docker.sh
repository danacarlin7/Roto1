clear

#Stop Docker Compose
# docker-compose down

docker login -u gitlab-ci-token -p kxrRs1wz4z1gs9ATNYcQ registry.gitlab.com
#build
# time docker-compose build | tee docker-build.log

docker tag rotopros-web registry.gitlab.com/anonymous-coder/rotoprosweb:beta
docker push registry.gitlab.com/anonymous-coder/rotoprosweb:beta

#Check Docker Images
docker images | grep rotoprosweb


#Start
# docker-compose up
