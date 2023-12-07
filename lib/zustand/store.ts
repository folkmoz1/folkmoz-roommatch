import { create } from 'zustand';
import { Favorite, Prisma, User } from '@prisma/client';
import { getUserById } from '@/lib/db/user.queries';

type Profile = Prisma.UserGetPayload<{
  include: {
    favorites: true;
    bookings: true;
    listings: true;
    permissions: true;
  };
}>;

type ProfileState = {
  isAuth: boolean;
  profile: Profile | null;
  setProfile: (data: Profile) => void;
};

export const useStore = create<ProfileState>((set) => ({
  isAuth: false,
  profile: null,
  setProfile: (data: Profile) => set({ profile: data, isAuth: true }),
}));

export type FormCreatePlace = {
  global: {
    loading: boolean;
    isUploaded: boolean;
    files: File[];
    previewImage: FileToDataUri[];
  };
  place: {
    placeType: string;
    placeName: string;
    location: {
      address: string;
      lat: number;
      lng: number;
      address_components: {
        long_name: string;
        short_name: string;
        types: string[];
      }[];
    };
    headline: string;
    description: string;
  };
  detail: {
    area: string;
    bedroom_count: string;
    bathroom_count: string;
    floor: string;
    price: string;
    mkt_price: string;
    images:
      | { url: string; public_id: string; height: number; width: number }[]
      | [];
  };
};

type FormCreatePlaceState = {
  form: FormCreatePlace;
  step: number;
  setForm: (data: FormCreatePlace) => void;
  setFormOne: (data: Partial<FormCreatePlace>) => void;
  setStep: (data: number) => void;
  resetForm: () => void;
  setGlobalLoading: (data: boolean) => void;
  setIsUploaded: (data: boolean) => void;
  setImages: (data: {
    url: string;
    public_id: string;
    height: number;
    width: number;
  }) => void;
  setFiles: (data: File[]) => void;
  setPreviewImage: (data: FileToDataUri[]) => void;
  deletePreviewImage: (data: number) => void;
};

type FileToDataUri = {
  src: string | ArrayBuffer | null;
} & Pick<File, 'name' | 'type' | 'size'>;

const initialForm: FormCreatePlace = {
  global: {
    loading: false,
    isUploaded: false,
    files: [],
    previewImage: [],
  },
  place: {
    placeType: 'Condominium',
    placeName: '',
    location: {
      address: '',
      lat: 0,
      lng: 0,
      address_components: [],
    },
    headline: '',
    description: '',
  },
  detail: {
    area: '',
    bedroom_count: '1',
    bathroom_count: '1',
    floor: '',
    price: '0',
    mkt_price: '0',
    images: [],
  },
};

export const useFormCreatePlaceStore = create<FormCreatePlaceState>((set) => ({
  form: initialForm,
  step: 0,
  deletePreviewImage: (data: number) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          global: {
            ...state.form.global,
            previewImage: state.form.global.previewImage.filter(
              (_, index) => index !== data
            ),
            files: state.form.global.files.filter((_, index) => index !== data),
          },
        },
      };
    });
  },
  setPreviewImage: (data: FileToDataUri[]) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          global: {
            ...state.form.global,
            previewImage: [...state.form.global.previewImage, ...data],
          },
        },
      };
    });
  },
  setFiles: (data: File[]) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          global: {
            ...state.form.global,
            files: [...state.form.global.files, ...data],
          },
        },
      };
    });
  },
  setImages: (data: {
    url: string;
    public_id: string;
    height: number;
    width: number;
  }) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          detail: {
            ...state.form.detail,
            images: [...state.form.detail.images, data],
          },
        },
      };
    });
  },
  setIsUploaded: (data: boolean) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          global: {
            ...state.form.global,
            isUploaded: data,
          },
        },
      };
    });
  },
  setFormOne: (data: Partial<FormCreatePlace>) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          ...data,
        },
      };
    });
  },
  setGlobalLoading: (data: boolean) => {
    set((state) => {
      return {
        form: {
          ...state.form,
          global: {
            ...state.form.global,
            loading: data,
          },
        },
      };
    });
  },
  resetForm: () => {
    set({ form: initialForm, step: 0 });
  },
  setStep: (data: number) => set({ step: data }),
  setForm: (data: FormCreatePlace) => set({ form: data }),
}));
