import { Body, Controller, Headers, Post,Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto, VerifyDto } from "../dto/auth.dto";

@Controller('app/auth')
export class AuthController {
  constructor(private service: AuthService) {
  }

  @Post("register")
  register(@Body() body: RegisterDto){
    return this.service.register(body)
  }

  @Post("login")
  login(@Body() body: LoginDto){
    return this.service.login(body)
  }

  @Post("verify")
  verify(@Request() req, @Body() body: VerifyDto){


    return this.service.verify(body, req.user)
  }

  @Post("logout")
  logout(@Request() req){


    return this.service.logout(req.user)
  }
}
