import droneApi from "@/config/apiRoute";
import { FindReportsRequest, FindReportsRequestDays } from '../interfaces/findReports/reports-response.interface';
import { UAVResponse } from "../interfaces/findReports/uav.interface";

const BASE_URL = "/datos_uavs";


//falta implementar
export const findReportsDay = async (
    request: FindReportsRequest,
    idDrone: number
  ): Promise<UAVResponse[]> => {
    try {
      const { fecha, time1, time2 } = request;
  
      const response = await droneApi.get(
        `${BASE_URL}/filter_by_day/${idDrone}?date=${fecha}&start_time=${time1}&end_time=${time2}`
      );
      const dataResponse = response.data as UAVResponse[];
  
      return dataResponse;
    } catch (error) {
      throw error;
    }
  };
  
  export const findReportsMonth = async (idDrone: number): Promise<UAVResponse[]> => {
    try {
      const response = await droneApi.get<UAVResponse[]>(`${BASE_URL}/filter_by_month/${idDrone}`);
      
      const dataResponse = response.data;

      return dataResponse;
    } catch (error) {
      throw error;
    }
  };
  
  export const findReportsWeek = async (idDrone: number): Promise<UAVResponse[]> => {
    try {
      const response = await droneApi.get<UAVResponse[]>(`${BASE_URL}/filter_by_week/${idDrone}`);
      const dataResponse = response.data;
      return dataResponse;
    } catch (error) {
      throw error;
    }
  };
  
  export const findReportsCurrent = async (idDrone: number): Promise<UAVResponse[]> => {
    try {
      const response = await droneApi.get<UAVResponse[]>(`${BASE_URL}/current/${idDrone}`);
      const dataResponse = response.data;
      return dataResponse;
    } catch (error) {
      throw error;
    }
  };

  export const findByDays = async ({fecha1, fecha2}:FindReportsRequestDays, idDrone: number): Promise<UAVResponse[]> => {
    try {
      const response = await droneApi.get<UAVResponse[]>(`${BASE_URL}/personalized_info/${idDrone}?start_date=${fecha1}&end_date=${fecha2}`);
      const dataResponse = response.data;
      return dataResponse;
    } catch (error) {
      throw error;
    }
  } 
  