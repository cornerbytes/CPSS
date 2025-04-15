#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <WiFiManager.h>  

// MQTT Broker
const char* mqtt_server = "change_to_your_mqtt_broker_ip_addr_device"; /
const int mqtt_port = 1883;
const char* mqtt_topic = "building/temperature";

// DHT Configuration
#define DHTPIN D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);


WiFiClient espClient;
PubSubClient client(espClient);


void setup_wifi() {
  WiFiManager wifiManager;

  if (!wifiManager.autoConnect("ESP8266-Setup")) {
    Serial.println("Failed to connect to WiFi, starting access point...");
    delay(3000);
    ESP.restart();
  }
  
  Serial.println("WiFi connected successfully!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until reconnected to MQTT
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  setup_wifi();
  // Connect to MQTT server
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int lightValue = analogRead(A0);

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // concat str
  String payload = "Humidity: " + String(humidity) + " %\tTemperature: " + String(temperature) + " °C\tLight: " + String(lightValue);
  Serial.println(payload);

  // Publish to MQTT
  client.publish(mqtt_topic, payload.c_str());

  delay(2000);
}

