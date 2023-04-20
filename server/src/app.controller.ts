import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserRequestDto } from './modules/user/dto/register-user.dto';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Hello from Nest Js!' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Posting something to show' })
  @ApiResponse({
    status: 200,
    description: 'Successful Response with the body posted',
  })
  @Post('test')
  public test(@Body() body: any) {
    return body;
  }
}
