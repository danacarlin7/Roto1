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
docker images | grep rotopros
#docker rmi rotopros-web


#Build1
time docker-compose build | tee docker-build.log
#time docker-compose build --no-cache | tee docker-build.log

#Start
docker-compose up

#Open a mwebbrowser
# python -mwebbrowser http://localhost:8080

# Tag + Push Docker Images
# ------------------
# docker tag rotopros-api rotopros/rotopros-api:latest
docker tag rotopros-web rotopros/rotopros-web:latest
docker push rotopros/rotopros-web:latest
# docker push rotopros/rotopros-api:latest
docker images | grep rotopros
#

# clean out docker bad data
# ------------------
# docker container prune --force
# docker image prune --force
# docker network prune --force
# docker volume prune --force

# docker rmi $(docker images -f "dangling=true" -q)
