import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiReqWithUser } from 'pages/api/auth/[...slug]';

export const routeHandler = async (
  req: NextApiReqWithUser | NextApiRequest,
  res: NextApiResponse,
  callback: (...args: any) => any
) => {
  try {
    return await callback();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      data: err,
    });
  }
};
