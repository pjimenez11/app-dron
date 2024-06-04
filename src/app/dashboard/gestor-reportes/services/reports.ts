import droneApi from "@/config/apiRoute";
import { reportsData } from "../data/reports";
import {
  FindReportsRequest,
  FindReportsResponse,
} from "../interfaces/findReports/reports-response.interface";

export const findReports = async (
  request: FindReportsRequest
): Promise<FindReportsResponse[]> => {
  try {
    const { fecha, time1, time2 } = request;

    const response = await droneApi.get(`/show_solar_panel_info?date=${fecha}&start_time=${time1}&end_time=${time2}`);
    const dataResponse = response.data as FindReportsResponse[];

    console.log(dataResponse);

    return dataResponse;
  } catch (error) {
    throw error;
  }
};
