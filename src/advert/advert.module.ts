import { Module } from '@nestjs/common';
import { AdvertController } from './advert.controller';
import { AdvertService } from './advert.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [AdvertController],
  providers: [AdvertService],
  imports: [PrismaModule]
})
export class AdvertModule {}
