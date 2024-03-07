import { Body, Controller, Patch, Post, Headers } from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateAddressDto, UpdateAddressDto, UpdateStoreDto } from "../dto/store.dto";

@Controller('app/store')
export class StoreController {
  constructor(private service: StoreService) {
  }

  @Patch("/")
  updateStore(@Headers() headers: any, @Body() body: UpdateStoreDto){
    const user: any = JSON.parse(headers.user);
    delete headers.user;

    return this.service.updateStore(user, body)
  }

  @Post("address")
  createStoreAddress(@Headers() headers: any, @Body() body: CreateAddressDto){
    const user: any = JSON.parse(headers.user);
    delete headers.user;

    return this.service.createStoreAddress(user, body)
  }

  @Patch("address")
  updateStoreAddress(@Headers() headers: any, @Body() body: UpdateAddressDto){
    const user: any = JSON.parse(headers.user);
    delete headers.user;

    return this.service.updateStoreAddress(user, body)
  }



}
