# Running the broker
`mosquitto -v -c mosquitto.conf`

# Connect as a publisher to broker
`mosquitto_pub -t /example/cpss -m "this is example" -h 192.168.7.11`

# Connect as a subscriber to broker 
`mosquitto_sub -t /example/cpss -h 192.168.7.11`

# Notes
- make sure to change ip address of mqtt_broker in code.c
- make sure the connection between esp8266 and mqtt_broker (firewall, wifi freq standard, router rule)

# Step by step
- install all the library in arduino IDE
- Compile and upload the code to esp8266
- For the first time, connect your laptop or smartphone to "ESP8266-Setup" SSID
- Open the serial monitor and copy the ip address to your browser that connected to the "ESP8266-Setup" SSID
- Connect the esp8266 to your real wifi.
- Run the docker container 
- Done
