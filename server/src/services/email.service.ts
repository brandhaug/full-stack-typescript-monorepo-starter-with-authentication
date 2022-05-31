import * as Email from '../config/email'
import { Attachment } from 'nodemailer/lib/mailer'

export const sendMail = async ({ to, replyTo, bcc, subject, html, attachments }: { to: string, subject: string, html: string, replyTo?: string, bcc?: string, attachments?: Attachment[] }) => {
  const response = await new Promise((resolve, reject) => {
    Email.transporter.sendMail({
      from: `'Company Inc.' <${Email.defaultMail}>`,
      to: process.env.NODE_ENV === 'development' ? Email.defaultMail : to,
      replyTo: replyTo || undefined,
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
