import {Controller, Get, Request} from '@nestjs/common';
import {UserService} from "@/user.service";

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
