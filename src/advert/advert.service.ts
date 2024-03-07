import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AdvertCreate } from "../interfaces/advert.interface";

@Injectable()
export class AdvertService {
  constructor(private prisma: PrismaService) {
  }

  async createAdvert(body: AdvertCreate){
    try{
      const advert = await this.prisma.advert.create({
        data: {
          userId: "",
          addressId: body.addressId,
          name: body.name,
          description: body.description,
          price: body.price
        }
      })

      await this.prisma.advert_interaction.create({
        data: {
          advertId: advert.id
        }
      })

    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

  async getAllAdverts(){
    try{
      return this.prisma.advert.findMany({
        where: {
          isActive: true,
          isDeleted: true
        }
      })
    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

}
