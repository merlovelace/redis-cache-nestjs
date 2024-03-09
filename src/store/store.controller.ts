import { Body, Controller, Patch, Post, Headers,Request } from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateAddressDto, UpdateAddressDto, UpdateStoreDto } from "../dto/store.dto";

@Controller('app/store')
export class StoreController {
  constructor(private service: StoreService) {
  }

  @Patch("/")
  updateStore( @Body() body: UpdateStoreDto,@Request() req){

    return this.service.updateStore(req.user, body)
  }

  @Post("address")
  createStoreAddress(@Body() body: CreateAddressDto,@Request() req){

    return this.service.createStoreAddress(req.user, body)
  }

  @Patch("address")
  updateStoreAddress(@Body() body: UpdateAddressDto,@Request() req){

    return this.service.updateStoreAddress(req.user, body)
  }



}
