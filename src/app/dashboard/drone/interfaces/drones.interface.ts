export interface Dron {
  id: number;
  tipo_dron: string;
  capacidad_bateria: number;
  tipo_placa: string;
  max_viento_vuelo: number;
  user_name: string;
}

export interface DronForm {
  tipo_dron: string;
  capacidad_bateria: number;
  tipo_placa: string;
  max_viento_vuelo: number;
  user_id: number;
}
