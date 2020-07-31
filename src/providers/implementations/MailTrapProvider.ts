import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

import { IMailProvider, IMessage } from "../IMailProvider";

class MailTrapProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'aa130d70b155a9',
        pass: 'c843df5ba105a2',
      }
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

export default MailTrapProvider;