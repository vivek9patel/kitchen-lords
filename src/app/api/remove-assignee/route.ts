import { resetDaysInAllKitchens } from '@/firebase/server';
import type { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const date = new Date();
  const day = date.getDay();
  const day_name = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day];
  const godUserEmail = process.env.VERCEL_USER_EMAIL;

  if(godUserEmail){
    const res = await resetDaysInAllKitchens(godUserEmail, day_name);
    if(res.success){
      return new Response('Success', {
        status: 200,
      });
    }
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
 
  return new Response('Unauthorized', {
    status: 401,
  });
  
}