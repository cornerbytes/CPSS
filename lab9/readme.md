Copy of lab8

# how to run
`sudo docker compose up -d`

# how to run broker
`sudo docker exec -it mqtt_app sh` inside the container run this command `node broker_mysql.js`

# how to run web server
open new terminal, `sudo docker exec -it mqtt_app sh` inside the container run this command `cd web_server` after that `node server.js`

# check the web_server
open browser and type `http://localhost:3000/`

# important notes
`make sure your esp connect to the same network and set the ip address of mqtt broker to your laptop ip address`
