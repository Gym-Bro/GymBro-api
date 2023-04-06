import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola desde nest en firebase!!';
  }

  @Get('firestore')
  public async firestore() {
    return await this.appService.getUsers();
  }
}
