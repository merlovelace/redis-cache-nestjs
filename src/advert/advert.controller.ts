import { Body, Controller, Post, Headers, Patch, Get, Param, Query, Delete } from "@nestjs/common";
import { AdvertService } from "./advert.service";
import { CreateAdvertDto } from "../dto/advert.dto";

@Controller('app/adverts')
export class AdvertController {
  constructor(private readonly service: AdvertService) {
  }

  @Post("/")
  createAdvert(@Body() body: CreateAdvertDto){
   return this.service.createAdvert(body)
  }

  @Get("/")
  getAllAdverts(){
    return this.service.getAllAdverts()
  }

}
