import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { LINE_ACCESS_TOKEN, LINE_MESSAGE_PUSH_URL } from 'src/variables';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  webhook(@Res() res: Response, @Body() request) {
    return this.appService.webhook(res, request);
  }
  @Post('/send')
  send(@Res() res: Response, @Req() request: Request): string {
    const body = JSON.stringify({
      to: request.body.to,
      messages: request.body.messages,
    });
    fetch(LINE_MESSAGE_PUSH_URL, {
      method: 'POST',
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // レスポンスをJSONで解析
      })
      .then((data) => {
        console.log('Success:', data); // 成功した場合のログ
      })
      .catch((error) => {
        console.error('Error:', error); // エラーが発生した場合のログ
      });
    res.status(200).send('Hello World!');
    return this.appService.getHello();
  }
}
