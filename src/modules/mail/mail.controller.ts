import { Controller, Post, Body, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendSMS(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('text') text: string,
  ): Promise<any> {
    return this.mailService.sendSMS(to, text);
  }

  @Get('send-email')
  async sendEmail() {
    await this.mailService
      .sendUserConfirmation('John Doe', '123456')
      .then(() => console.log('Email sent'));
    return 'Email sent';
  }
}
