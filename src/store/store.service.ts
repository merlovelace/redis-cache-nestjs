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
