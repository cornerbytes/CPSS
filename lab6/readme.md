# Running the broker
`mosquitto -v -c mosquitto.conf`

# Connect as a publisher to broker
`mosquitto_pub -t /example/cpss -m "this is example" -h 192.168.7.11`

# Connect as a subscriber to broker 
`mosquitto_sub -t /example/cpss -h 192.168.7.11`

# Notes
- make sure to change ip address of mqtt_broker in code.c
- make sure the connection between esp8266 and mqtt_broker (firewall, wifi freq standard, router rule)
