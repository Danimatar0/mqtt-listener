"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mqtt_1 = require("mqtt");
const winston_1 = require("winston");
require('dotenv').config();
const configService = new config_1.ConfigService();
let MqttService = class MqttService {
    constructor(logger) {
        this.logger = logger;
    }
    onModuleInit() {
        const logger = this.logger;
        const host = configService.get('HOST');
        const port = configService.get('PORT');
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
        const connectUrl = `mqtt://${host}:${port}`;
        const topic = "client-management/init";
        this.mqttClient = (0, mqtt_1.connect)(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });
        this.mqttClient.on("connect", function () {
            logger.info("Connected to MQTT");
            this.subscribe(topic);
        });
        this.mqttClient.on("message", function (topic, message) {
            logger.info(`Received message on ${topic}: ${message.toString()}`);
        });
        this.mqttClient.on("error", function () {
            logger.error("Error in connecting to MQTT");
        });
    }
    publish(topic, payload) {
        this.mqttClient.publish(topic, payload);
        return `Publishing to ${topic}`;
    }
    subscribe(topic) {
        this.mqttClient.subscribe(topic);
        return `Subscribing to ${topic}`;
    }
};
MqttService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [winston_1.Logger])
], MqttService);
exports.MqttService = MqttService;
//# sourceMappingURL=mqtt.service.js.map