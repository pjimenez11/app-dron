// components/DroneMap.tsx
import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api'; // Asumiendo que tienes un archivo types.ts donde defines UAVResponse
import { UAVResponse } from '@/app/dashboard/gestor-reportes/interfaces/findReports/uav.interface';

interface DroneMapProps {
  uavResponses: UAVResponse;
}

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = {
  lat: 0,
  lng: 0,
};

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
};

const DroneMap: React.FC<DroneMapProps> = ({ uavResponses }) => {
  const pathCoordinates = uavResponses?.data.map(response => ({
    lat: response.latitud,
    lng: response.longitud,
  }));

  return (
    <LoadScript googleMapsApiKey="AIzaSyAqmSVPuFOoBQVChoWoEoA6N3kddus-3Ls">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={pathCoordinates[0]}>
        <Polyline path={pathCoordinates} options={options} />
      </GoogleMap>
    </LoadScript>
  );
};

export default DroneMap;
