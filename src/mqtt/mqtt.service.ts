import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { connect } from "mqtt";
import { Logger } from 'winston';

require('dotenv').config();
const configService = new ConfigService();
@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;
    constructor(@Inject('winston')
    private readonly logger: Logger) {

    }
    onModuleInit() {
        const logger = this.logger;
        const host = configService.get<string>('HOST');
        const port = configService.get<string>('PORT');
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

        const connectUrl = `mqtt://${host}:${port}`;
        const topic = "client-management/init";

        this.mqttClient = connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            //   username: configService.get<string>('username'),
            //   password: configService.get<string>('password'),
            reconnectPeriod: 1000,
        });

        this.mqttClient.on("connect", function () {
            logger.info("Connected to MQTT");
            this.subscribe(topic);
        });

        this.mqttClient.on("message", function (topic, message) {
            logger.info(`Received message on ${topic}: ${message.toString()}`);
            // this.publish(topic, 'Welcome to MQTT');
        });

        this.mqttClient.on("error", function () {
            logger.error("Error in connecting to MQTT");
        });


    }
    publish(topic: string, payload: string): string {
        // info(`Publishing to ${topic}`);
        this.mqttClient.publish(topic, payload);
        return `Publishing to ${topic}`;
    }

    subscribe(topic: string): string {
        // info(`Subscribing to ${topic}`);
        this.mqttClient.subscribe(topic);
        return `Subscribing to ${topic}`;
    }

}
