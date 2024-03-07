import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertModule } from './advert/advert.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { StoreService } from './store/store.service';
import { StoreModule } from './store/store.module';
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from 'cache-manager-redis-store'
import * as process from "process";
import {SecurityMiddleware} from "./config/security"
@Module({
  imports: [ AdvertModule, AuthModule, PrismaModule, StoreModule,
  CacheModule.register({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    isGlobal: true,
    //ttl: 5
  })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, StoreService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*');
  }
}
