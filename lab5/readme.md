# Running the broker
`mosquitto -v -c mosquitto.conf`

# Connect as a publisher to broker
`mosquitto_pub -t /example/cpss -m "this is example" -h 192.168.7.11`

# Connect as a subscriber to broker 
`mosquitto_sub -t /example/cpss -h 192.168.7.11`
