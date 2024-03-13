import { Injectable, NestMiddleware, HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction, request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { checkToken } from "./jwt";
import * as jwt from "jsonwebtoken";
import { publicApis } from "./public.apis";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";


@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService ,@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async use(req: Request, res: Response, next: NextFunction) {

    const { originalUrl, headers } = req;
    const { authorization, platform } = headers;

    console.log(originalUrl);

    if (authorization === undefined) {
      if (!publicApis.includes(originalUrl)) {
        return res.status(401).send("YouNotHaveToken");
      } else {
        return next();
      }
    }


    let bearer
    if (typeof authorization === "string") {
      bearer = authorization.split(" ");
    }
    if (bearer.length !== 2) {
      throw "BadBearerToken";
    }


    const user = await checkToken(bearer[1]);
    if (!user) {
      throw "TokenNotFound";
    }


    const userId = (user as jwt.JwtPayload).id;
    const userInfoRedis: string | any = await this.cacheManager.get(`app:${userId}:userInfo`);
    const userToken: string | any = await this.cacheManager.get(`app:${userId}:token`);
    const redisUser = JSON.parse(userInfoRedis)
    redisUser.token = userToken
    if (!userInfoRedis || !userToken) {
      throw new NotFoundException();
    }


    if (originalUrl === "/app/me") {
      res.status(200).send(redisUser);
    }

    //req.headers.user = JSON.stringify(redisUser);
    request['user'] = redisUser;
    return next();

  }
}