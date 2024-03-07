import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { StoreService } from "./store.service";

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [PrismaModule]
})
export class StoreModule {}
