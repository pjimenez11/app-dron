import { useState } from "react";
import { UAVResponse } from "../interfaces/findReports/uav.interface";
import {
  FindReportsRequest,
  FindReportsRequestDays,
} from "../interfaces/findReports/reports-response.interface";
import {
  findByDays,
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../services/uav";
import moment from "moment";

const useUAV = () => {
  const [reportsUAV, setReportsUAV] = useState<UAVResponse[]>([]);
  const [loadingUAV, setLoadingUAV] = useState<boolean>(false);

  const handlerFindReportsDayUAV = async (
    request: FindReportsRequest,
    idDrone: number
  ) => {
    setLoadingUAV(true);
    try {
      const data = await findReportsDay(request, idDrone);
      setReportsUAV(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsMonthUAV = async (idDrone: number) => {
    setLoadingUAV(true);
    try {
      const data = await findReportsMonth(idDrone);
      setReportsUAV(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsWeekUAV = async (idDrone: number) => {
    setLoadingUAV(true);
    try {
      const data = await findReportsWeek(idDrone);
      setReportsUAV(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsCurrentUAV = async (idDrone: number) => {
    setLoadingUAV(true);
    try {
      const data = await findReportsCurrent(idDrone);
      setReportsUAV(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsByDaysUAV = async (
    request: FindReportsRequestDays,
    idDrone: number
  ) => {
    setLoadingUAV(true);
    try {
      const data = await findByDays(request, idDrone);
      setReportsUAV(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const promedioPorcentajeBateria =
    reportsUAV.reduce((acc, report) => acc + report.porcentaje_bateria, 0) /
    reportsUAV.length;

  const corriente = reportsUAV.map((report) => report.corriente);
  const voltaje = reportsUAV.map((report) => report.voltaje);
  const porcentajeBateria = reportsUAV.map(
    (report) => report.porcentaje_bateria
  );

  const firstDate = moment.utc(reportsUAV[0]?.fecha_registro);
  const lastDate = moment.utc(
    reportsUAV[reportsUAV.length - 1]?.fecha_registro
  );

  const labels = () => {
    if (firstDate.isSame(lastDate, "day")) {
      return reportsUAV.map((report) =>
        moment.utc(report.fecha_registro).format("HH:mm")
      );
    }

    if (firstDate.isSame(lastDate, "month")) {
      return reportsUAV.map((report) =>
        moment.utc(report.fecha_registro).format("DD HH:mm")
      );
    }
    return reportsUAV.map((report) =>
      moment.utc(report.fecha_registro).format("DD/MM HH:mm")
    );
  };

  const handlerResetReportsUAV = () => {
    setReportsUAV([]);
  };

  return {
    reportsUAV,
    loadingUAV,
    handlerFindReportsDayUAV,
    handlerFindReportsMonthUAV,
    handlerFindReportsWeekUAV,
    handlerFindReportsCurrentUAV,
    handlerResetReportsUAV,
    handlerFindReportsByDaysUAV,
    promedioPorcentajeBateria,
    corriente,
    voltaje,
    labels,
    porcentajeBateria,
  };
};

export default useUAV;
