import { Body, Controller, Post, Request, Patch, Get, Param, Query, Delete } from "@nestjs/common";
import { AdvertService } from "./advert.service";
import { CreateAdvertDto } from "../dto/advert.dto";

@Controller('app/advert')
export class AdvertController {
  constructor(private readonly service: AdvertService) {
  }

  @Post("/")
  createAdvert(@Request() req,@Body() body: CreateAdvertDto){

   return this.service.createAdvert(body, req.user)
  }

  @Get("/")
  getAllAdverts(){
    return this.service.getAllAdverts()
  }

}
