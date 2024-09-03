import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SessionMiddleware } from './middleware/sessionMiddleware';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ClientsModule.register([{
      name:'Order_Service',
      transport:Transport.TCP,
      options:{port:3001}
    }]),
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('/*');
  }
}
