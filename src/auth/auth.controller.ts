import { Body, Controller, Headers, Post } from "@nestjs/common";
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
  verify(@Headers() headers: any, @Body() body: VerifyDto){
    const user: any = JSON.parse(headers.user);
    delete headers.user;

    return this.service.verify(body, user)
  }

  @Post("logout")
  logout(@Headers() headers: any){
    const user: any = JSON.parse(headers.user);
    delete headers.user;

    return this.service.logout(user)
  }
}
