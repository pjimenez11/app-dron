
export interface FindReportsRequest {
  fecha: string;
  time1: string;
  time2: string;
}


export interface FindReportsResponse {
  id:             number;
  fecha_registro: string;
  vPan:           number;
  cPan:           number;
  vBat:           number;
  cBat:           number;
  vCar:           number;
  cCar:           number;
}
