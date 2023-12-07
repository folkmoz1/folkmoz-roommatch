import { api } from '@/lib/apis/configs/axiosConfig';
import { defineCancelApiObject } from '@/lib/apis/configs/axiosUtils';

export const UserAPI = {
  signIn: async (
    credentials: Partial<Record<keyof CredentialsInputs, unknown>>
  ) => {
    const resp = await api.request({
      method: 'POST',
      url: '/user/login',
      data: credentials,
    });
    return resp.data;
  },
  isExists: async (
    id: string,
    cancel = false
  ): Promise<{ user: string; status: string }> => {
    const resp = await api.request({
      method: 'POST',
      url: '/user/exists',
      data: {
        providerId: id,
      },
      signal: cancel
        ? cancelApiObject[UserAPI.isExists.name].handleRequestCancellation()
        : undefined,
    });
    return resp.data;
  },

  update: async (id: string, phone_number: string, cancel = false) => {
    const resp = await api.request({
      method: 'POST',
      url: '/user/update',
      data: {
        providerId: id,
        phone_number,
      },
      signal: cancel
        ? cancelApiObject[UserAPI.update.name].handleRequestCancellation()
        : undefined,
    });
    return resp.data;
  },
};

const cancelApiObject = defineCancelApiObject(UserAPI);
