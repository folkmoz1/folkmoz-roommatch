import { defineCancelApiObject } from '@/lib/apis/configs/axiosUtils';
import axios from 'axios';
import { CloudinaryResponse } from '@/lib/types';

const instance = axios.create();

export const CloudinaryAPI = {
  uploadOne: async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ToRoomPreview');
    data.append('timestamp', `${Date.now()}`);

    const resp: { data: CloudinaryResponse } = await instance.post(
      'https://api.cloudinary.com/v1_1/folkmoz/image/upload',
      data
    );

    const { public_id, width, height, secure_url } = resp.data;

    return {
      url: secure_url,
      public_id,
      width,
      height,
    };
  },
};

const cancelApiObject = defineCancelApiObject(CloudinaryAPI);
