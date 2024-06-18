export interface UAVResponse {
    id:                 number;
    fecha_registro:     string;
    voltaje:            number;
    porcentaje_bateria: number;
    corriente:          number;
    modo_vuelo:         string;
    velocidad:          number;
    altitud:            number;
    latitud:            number;
    longitud:           number;
    uav_id:             number;
}
