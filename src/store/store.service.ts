import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoreService {
  constructor(private prisma : PrismaService) {
  }

  async updateStore(user: any, body: any){
    try{


    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

  async createStoreAddress(user: any, body: any){
    try{
      await this.prisma.store_address.create({
        data: {
          userId: user.id,
          city: body.city,
          district: body.district,
          neighbourhood: body.neighbourhood,
          address: body.address,
          phone: body.phone
        }
      })

    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

  async updateStoreAddress(user: any, body: any){
    try{


    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }
}
