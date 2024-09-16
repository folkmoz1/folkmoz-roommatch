'use server';
import { formRegisterSchema } from '@/lib/formValidate';
import * as z from 'zod';
import { FormCreatePlace } from '@/lib/zustand/store';

export const createNewUser = async (
  body: z.infer<typeof formRegisterSchema>
) => {
  try {
    const endpoint = process.env.NEXTAUTH_URL + '/api/user/create';

    console.log('endpoint', endpoint);
    const response = await fetch(endpoint, {
      cache: 'no-cache',
      method: 'POST',
      body: JSON.stringify({
        ...body,
        provider: 'Credentials',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const createNewListing = async (body: FormCreatePlace) => {
  try {
    const response = await fetch(
      process.env.NEXTAUTH_URL + '/api/user/announcement',
      {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};
