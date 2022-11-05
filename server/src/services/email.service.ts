import * as Email from '../config/email'
import { Attachment } from 'nodemailer/lib/mailer'
import { SentMessageInfo } from 'nodemailer'

export const sendMail = async ({ to, replyTo, bcc, subject, html, attachments }: { to: string, subject: string, html: string, replyTo?: string, bcc?: string, attachments?: Attachment[] }): Promise<SentMessageInfo> => {
  const response = await new Promise((resolve, reject) => {
    if (!process.env.EMAIL) {
      throw new Error('Missing EMAIL env variable')
    }

    Email.transporter.sendMail({
      from: `'Company Inc.' <${process.env.EMAIL}>`,
      to: process.env.NODE_ENV === 'production' ? to : process.env.EMAIL,
      replyTo,
      bcc,
      subject,
      html,
      attachments
    }, (err, info) => {
      if (err) reject(err)
      resolve(info)
    })
  })

  return response
}
