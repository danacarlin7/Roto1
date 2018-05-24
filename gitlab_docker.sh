clear
# docker rmi $(docker images -f "dangling=true" -q)
# docker image list

#Clear Ports
fePort=4000
bePort=3000
lsof -i ":$fePort" | grep node | awk '{print $2}' | while read pid; do kill -9 $pid; done
lsof -i ":$bePort" | grep node | awk '{print $2}' | while read pid; do kill -9 $pid; done

#Stop Docker Compose
docker-compose down

#Clear Old Images
docker images | grep rotoprosweb
#docker rmi rotopros-web
# docker rmi rotopros-api

# check if web/dist
# if [ ! -d "web/dist" ]
# then
#   echo "web/dist not found."
#   cd web
#   echo "creating ... "
#   npm run deploy
#   echo "web/dist created."
#   cd ..
#
# else
#   echo "web/dist found."
# fi


#Build
time docker-compose build | tee docker-build.log
#time docker-compose build --no-cache | tee docker-build.log

#Start
docker-compose up

# Tag + Push Docker Images
# ------------------
docker tag rotopros-web registry.gitlab.com/anonymous-coder/rotoprosweb:latest
docker push registry.gitlab.com/anonymous-coder/rotoprosweb:latest
docker images | grep rotoprosweb
#

# clean out docker bad data
# ------------------
# docker container prune --force
# docker image prune --force
# docker network prune --force
# docker volume prune --force

# docker rmi $(docker images -f "dangling=true" -q)
