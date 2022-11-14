import {
  postCaptchaValidation,
  RecaptchaResponse,
} from '@myflownfts/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecaptchaResponse>
) {
  if (req.method !== 'POST') {
    return res.status(400);
  }

  const { captcha } = req.query;

  await postCaptchaValidation(captcha as string)
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({
        success: response.success,
        challenge_ts: response.challenge_ts,
        hostname: response.hostname,
        'error-codes': response['error-codes'],
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400);
    });
}
