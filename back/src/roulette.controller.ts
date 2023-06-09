import {Controller, Get, Request} from '@nestjs/common';
import {RouletteService} from "@/roulette.service";

@Controller({
  path: 'items',
  version: '1',
})
export class RouletteController {

  constructor(private readonly rouletteService: RouletteService) {
  }

  @Get()
  async getItemList() {
    return await this.rouletteService.getItemList();
  }

  @Get('win')
  async getWinning(@Request() req) {
    return this.rouletteService.roll(req.user);
  }
}
