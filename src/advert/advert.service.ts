import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AdvertCreate } from "../interfaces/advert.interface";

@Injectable()
export class AdvertService {
  constructor(private prisma: PrismaService) {
  }

  async createAdvert(body: AdvertCreate, user: any){
    try{
      const addressInfo = await this.prisma.store_address.findUnique({
        where: {
          id: body.addressId,
          isDeleted: false,
          isVerified: true
        }
      })

      if(!addressInfo){
        throw new HttpException("Adres bulunamadı",HttpStatus.NOT_FOUND)
      }

      const advert = await this.prisma.advert.create({
        data: {
          storeId: user.id,
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
      return await  this.prisma.advert.findMany({
        where: {
          isActive: true,
          isDeleted: false
        },
        include: {
          address: {
            select: {
              city: true,
              district: true,
              neighbourhood: true,
              address: true,
              phone: true
            }
          },
          photos: {
            select: {
              location: true
            }
          },
          interactions: {
            select: {
              phone: true,
              instagram_url: true,
              web_url: true,
              address: true
            }
          }
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
