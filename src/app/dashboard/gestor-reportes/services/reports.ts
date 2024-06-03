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
    const startTime = new Date(`${fecha}T${time1}Z`); 
    const endTime = new Date(`${fecha}T${time2}Z`); 

    const filteredReports = reportsData.filter((report) => {
      const reportTime = new Date(report.fecha);
      return reportTime >= startTime && reportTime <= endTime;
    });
    return filteredReports;
  } catch (error) {
    throw error;
  }
};
