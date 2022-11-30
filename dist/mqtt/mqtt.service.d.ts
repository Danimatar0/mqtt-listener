import { OnModuleInit } from '@nestjs/common';
import { Logger } from 'winston';
export declare class MqttService implements OnModuleInit {
    private readonly logger;
    private mqttClient;
    constructor(logger: Logger);
    onModuleInit(): void;
    publish(topic: string, payload: string): string;
    subscribe(topic: string): string;
}
