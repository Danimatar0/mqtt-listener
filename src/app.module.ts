import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
@Module({
  imports: [MqttModule, WinstonModule.forRoot({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        dirname: path.join(__dirname, './../log/debug/'), //path to where save loggin result 
        filename: 'debug.log', //name of file where will be saved logging result
        level: 'debug',
      }),
      new winston.transports.File({
        dirname: path.join(__dirname, './../log/info/'),
        filename: 'info.log',
        level: 'info',
      }),
    ]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
