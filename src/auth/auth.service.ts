import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {Register, Verify, Login } from "../interfaces/auth.interface"
import { compareHash, createHash } from "../config/bcrypt";
import { createToken } from "../config/jwt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache ) {
  }

  async register(body: Register){
    try{
      const emailExist = await this.prisma.store.findFirst({
        where: {
          email: body.email
        }
      })

      if(emailExist){
        throw new HttpException("Bu email kullanımda!", HttpStatus.BAD_REQUEST)
      }

      if(body.password !== body.passwordConfirm){
        throw new HttpException("Şifreler uyuşmamaktadır!", HttpStatus.BAD_REQUEST)
      }

      const hashedPassword = await createHash(body.password)
      const store = await this.prisma.store.create({
        data: {
          email: body.email,
          password: hashedPassword
        }
      })

      const code = Math.round(Math.random() * (999999 - 100000) + 100000)
      const now = new Date()
      const expired = new Date(now.setMinutes(now.getMinutes() + 5));
      const redisData = {
        code: code.toString(),
        expired: expired,
        isSuccess: false,
        isError: false
      }

      const token = await createToken({ id: store.id })

      await this.cacheManager.set(`app:${store.id}:userInfo`, JSON.stringify(store))
      await this.cacheManager.set(`app:${store.id}:token`, JSON.stringify(token))
      await this.cacheManager.set(`app:${store.id}:verify`, JSON.stringify(redisData))

      return {
        ...store,
        code: code,
        token: token
      }

    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

  async verify(body: Verify, user: any){
    try{
      let emailExist = await this.prisma.store.findFirst({
        where: {
          email: user.email,
          isDeleted: false
        }
      })

      if(!emailExist){
        throw new HttpException("Hesap bulunamadı!", HttpStatus.BAD_REQUEST)
      }

      const verifyInfo = await this.cacheManager.get(`app:${user.id}:verify`)

      let parsedVerifyInfo
      if (typeof verifyInfo === "string") {
        parsedVerifyInfo = JSON.parse(verifyInfo);
      }

      if(!verifyInfo){
        throw new HttpException("Doğrulama bilgisi bulunamadı.", HttpStatus.NOT_FOUND)
      }


      if(parsedVerifyInfo.isSuccess === false && parsedVerifyInfo.isError === false){
        if(parsedVerifyInfo.expired < new Date()){
          await this.cacheManager.del(`app:${user.id}:verify`)
          await this.cacheManager.del(`app:${user.id}:userInfo`)
          await this.cacheManager.del(`app:${user.id}:token`)
          throw new HttpException("Kodunuzun süresi dolmuştur.", HttpStatus.BAD_REQUEST)
        }

        if(parsedVerifyInfo.code !== body.code){
          throw new HttpException("Doğrulama kodunuz hatalıdır.", HttpStatus.BAD_REQUEST)
        }

        await this.prisma.store.update({
          where: {
            id: user.id
          },
          data: {
            isVerified: true
          }
        })

        emailExist.isVerified = true
        await this.cacheManager.del(`app:${user.id}:verify`)
        await this.cacheManager.set(`app:${user.id}:userInfo`, JSON.stringify(emailExist))
        return
      }


      throw new HttpException("Hatalı doğrulama!", HttpStatus.BAD_REQUEST)

    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

  async login(body: Login){
    try{
      const emailExist = await this.prisma.store.findFirst({
        where: {
          email: body.email,
          isDeleted: false
        }
      })

      if(!emailExist){
        throw new HttpException("Hesap bulunamadı!", HttpStatus.BAD_REQUEST)
      }

      if(!emailExist.isVerified){
        throw new HttpException("Hesabınızı doğrulayınız!", HttpStatus.BAD_REQUEST)
      }

      const isPasswordsMatch = await compareHash(body.password, emailExist.password)
      if(!isPasswordsMatch){
        throw new HttpException("Şifre veya email hatalı!", HttpStatus.BAD_REQUEST)
      }

      const token = await createToken({id: emailExist.id })
      await this.cacheManager.set(`app:${emailExist.id}:userInfo`, JSON.stringify(emailExist))
      await this.cacheManager.set(`app:${emailExist.id}:token`, JSON.stringify(token))

      return {
        ...emailExist,
        token: token
      }


    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }

  async logout(user: any){
    try{
      await this.cacheManager.del(`app:${user.id}:userInfo`)
      await this.cacheManager.del(`app:${user.id}:token`)

    }catch (e) {
      console.log(e);
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: e },
        HttpStatus.BAD_REQUEST, { cause: e }
      );
    }
  }
}
