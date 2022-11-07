import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400);
  }

  const { email } = req.query;

  const html = '<h1>Welcome to My Flow NFTs</h1> <p>Hello</p>';

  const transport = nodemailer.createTransport({
    host: process.env['NODEMAILER_SMTP_HOST'],
    port: process.env['NODEMAILER_SMTP_PORT'],
    auth: {
      user: process.env['NODEMAILER_USER_NAME'],
      pass: process.env['NODEMAILER_PASSWORD'],
    },
  });

  // "From" field assumes SendInBlue SMTP (Auth user = sender email)
  await transport
    .sendMail({
      subject: 'Welcome to My Flow NFTs',
      from: process.env['NODEMAILER_SENDER_EMAIL'],
      to: email,
      html: html,
      text: html.replace(/<[^>]+>/g, ''),
    })
    .then((response) => {
      return res.status(200).json({
        subject: response.subject,
        from: response.from,
        to: response.to,
        html: response.html,
        text: response.text,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
