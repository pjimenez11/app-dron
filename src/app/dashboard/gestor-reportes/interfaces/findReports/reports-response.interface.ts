export interface FindReportsResponse {
  id: number;
  fecha: string;
  vp: number;
  cp: number;
  vb: number;
  cb: number;
  vc: number;
  cc: number;
}

export interface FindReportsRequest {
  fecha: string;
  time1: string;
  time2: string;
}
