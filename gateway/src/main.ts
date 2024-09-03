import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
 
  app.use(session({
    secret: 'This is my secret',
    resave: true,
    saveUninitialized: true,
    cookie:{secure: false,sameSite:true,priority:'high',httpOnly:false}

  },));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
});
  await app.listen(3000);
}
async function main(){
  await new Promise(resolve => setTimeout(bootstrap, 5000));
}



main();
