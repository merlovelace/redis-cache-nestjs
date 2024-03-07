import { Body, Controller, Post, Headers, Patch, Get, Param, Query, Delete } from "@nestjs/common";
import { AdvertService } from "./advert.service";
import { CreateAdvertDto } from "../dto/advert.dto";

@Controller('app/advert')
export class AdvertController {
  constructor(private readonly service: AdvertService) {
  }

  @Post("/")
  createAdvert(@Headers() headers: any,@Body() body: CreateAdvertDto){
    const user: any = JSON.parse(headers.user);
    delete headers.user;

   return this.service.createAdvert(body, user)
  }

  @Get("/")
  getAllAdverts(){
    return this.service.getAllAdverts()
  }

}
