import droneApi from "@/config/apiRoute";
import {
  FindReportsRequest,
  FindReportsResponse,
} from "../interfaces/findReports/reports-response.interface";

export const findReportsDay = async (
  request: FindReportsRequest
): Promise<FindReportsResponse[]> => {
  try {
    const { fecha, time1, time2 } = request;

    const response = await droneApi.get(
      `/solar_panels/show_solar_panel_info?date=${fecha}&start_time=${time1}&end_time=${time2}`
    );
    const dataResponse = response.data as FindReportsResponse[];

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsMonth = async (): Promise<FindReportsResponse[]> => {
  try {
    const response = await droneApi.get("/solar_panels/filter_by_month");
    const dataResponse = response.data as FindReportsResponse[];

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsWeek = async (): Promise<FindReportsResponse[]> => {
  try {
    const response = await droneApi.get("/solar_panels/filter_by_week");
    const dataResponse = response.data as FindReportsResponse[];

    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const findReportsCurrent = async (): Promise<FindReportsResponse[]> => {
  try {
    const response = await droneApi.get("/solar_panels/current");
    const dataResponse = response.data as FindReportsResponse[];

    return dataResponse;
  } catch (error) {
    throw error;
  }
};
