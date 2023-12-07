'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useLocation } from '@/lib/hooks/useLocation';
import { Skeleton } from '@/components/ui/skeleton';

type GoogleMapsProps = {
  center: {
    lat: number;
    lng: number;
  } | null;
  getNewPosition?: (e: any) => void;
  canDrag: boolean;
  zoom?: number;
  width?: string | number | undefined;
  height?: string | number | undefined;
};

function GoogleMaps({
  center,
  getNewPosition,
  canDrag = true,
  zoom = 10,
  width,
  height,
}: GoogleMapsProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const containerStyle = {
    width: width || '500px',
    height: height || '400px',
    borderRadius: '12px',
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: canDrag,
  };

  return isLoaded && center ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={options}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF
        draggable={canDrag}
        onDragEnd={getNewPosition}
        position={center}
      />
    </GoogleMap>
  ) : (
    <>
      <Skeleton style={containerStyle} />
    </>
  );
}

export default React.memo(GoogleMaps);
