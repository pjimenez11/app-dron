
export interface FindReportsRequest {
  fecha: string;
  time1: string;
  time2: string;
}

export interface FindReportsRequestDays {
  fecha1: string;
  fecha2: string;
}

export interface FindReportsResponse {
  id:             number;
  fecha_registro: string;
  Vp:             number;
  Cp:             number;
  Vb:             number;
  Cb:             number;
  Vc:             number;
  Cc:             number;
}

