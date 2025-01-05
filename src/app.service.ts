import { Body, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { SUPABASE_FUNCTION_URL, SUPABASE_ANON_KEY } from 'src/variables';

const headers = {
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

type Request = {
  destination: string;
  events: [
    {
      type: string;
      message: { type: string; id: string; quoteToken: string; text: string };
      webhookEventId: 'string';
      deliveryContext: { isRedelivery: boolean };
      timestamp: number;
      source: { type: string; userId: string };
      replyToken: string;
      mode: string;
    },
  ];
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  webhook(@Res() res: Response, @Body() request: Request) {
    console.log('destination::', request.destination);
    console.log('event::', request.events[0]);
    const body = JSON.stringify({
      user: request.destination,
    });
    fetch(SUPABASE_FUNCTION_URL, {
      method: 'POST',
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // JSONとしてレスポンスを解析
      })
      .then((data) => {
        console.log('Success:', data); // 成功した場合のレスポンス
        return res.status(200).send(data);
      })
      .catch((error) => {
        console.error('Error:', error); // エラー発生時のログ
        throw new Error(error);
      });
  }
}
