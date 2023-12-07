import { useCallback, useEffect, useState } from 'react';
import MapMouseEvent = google.maps.MapMouseEvent;
import { useFormCreatePlaceStore } from '@/lib/zustand/store';

export const useLocation = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState('');
  const { setFormOne, form } = useFormCreatePlaceStore((state) => state);
  const [currentLatLng, setCurrentLatLng] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getAddress = async (lat: number, lng: number) => {
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      const data = await resp.json();
      const getAddress = data.results[0].formatted_address as string;
      const address_components = data.results[0].address_components as Array<{
        long_name: string;
        short_name: string;
        types: string[];
      }>;
      setAddress(getAddress);
      setFormOne({
        place: {
          ...form.place,
          location: {
            ...form.place.location,
            lng: lng,
            lat: lat,
            address: getAddress,
            address_components: address_components,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getNewPosition = useCallback(async (e: MapMouseEvent) => {
    if (!e.latLng) {
      console.log('no latlng');
      return;
    }
    const newLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setPosition(newLatLng);

    await getAddress(newLatLng.lat, newLatLng.lng);
  }, []);

  useEffect(() => {
    setAddress(
      form.place.location.address
        ? form.place.location.address
        : 'กรุณาเลือกตำแหน่งที่ตั้ง'
    );
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          setPosition({ lat, lng });
          setCurrentLatLng({ lat, lng });
          getAddress(lat, lng);
        }
      );
    } else {
      console.log('Geolocation is not available in your browser.');
    }
  }, []);

  return { center: position, getNewPosition, address };
};
