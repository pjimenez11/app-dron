import { useState } from "react";
import moment from "moment";
import { UAVResponse } from "../../interfaces/findReports/uav.interface";
import {
  FindReportsRequest,
  FindReportsRequestDays,
} from "../../interfaces/findReports/paneles-solares.interface";
import {
  findByDays,
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../../services/uav";
import { toast } from "react-toastify";

const initialState: UAVResponse = {
  data: [],
  pagination: { count: 0, page: 0, items: 0, pages: 0, next: 0, prev: 0 },
};

const useUAV = () => {
  const [reportsUAV, setReportsUAV] = useState<UAVResponse>(initialState);
  const [loadingUAV, setLoadingUAV] = useState<boolean>(false);

  const handlerFindReportsDayUAV = async (
    request: FindReportsRequest,
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingUAV(true);
    try {
      const promise = findReportsDay(request, idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsUAV(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsMonthUAV = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingUAV(true);
    try {
      const promise = findReportsMonth(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsUAV(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsWeekUAV = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingUAV(true);
    try {
      const promise = findReportsWeek(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsUAV(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsCurrentUAV = async (
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingUAV(true);
    try {
      const promise = findReportsCurrent(idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsUAV(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const handlerFindReportsByDaysUAV = async (
    request: FindReportsRequestDays,
    idDrone: number,
    page: number = 1
  ) => {
    setLoadingUAV(true);
    try {
      const promise = findByDays(request, idDrone, page);
      toast.promise(promise, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      setReportsUAV(await promise);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUAV(false);
    }
  };

  const promedioPorcentajeBateria =
    reportsUAV?.data.reduce(
      (acc, report) => acc + report.porcentaje_bateria,
      0
    ) / reportsUAV?.data.length;

  const corriente = reportsUAV?.data.map((report) => report.corriente);
  const voltaje = reportsUAV?.data.map((report) => report.voltaje);
  const porcentajeBateria = reportsUAV?.data.map(
    (report) => report.porcentaje_bateria
  );

  const firstDate = moment.utc(reportsUAV?.data[0]?.fecha_registro);
  const lastDate = moment.utc(
    reportsUAV?.data[reportsUAV?.data.length - 1]?.fecha_registro
  );

  const labels = () => {
    if (firstDate.isSame(lastDate, "day")) {
      return reportsUAV?.data.map((report) =>
        moment.utc(report.fecha_registro).format("HH:mm")
      );
    }

    if (firstDate.isSame(lastDate, "month")) {
      return reportsUAV?.data.map((report) =>
        moment.utc(report.fecha_registro).format("DD HH:mm")
      );
    }
    return reportsUAV?.data.map((report) =>
      moment.utc(report.fecha_registro).format("DD/MM HH:mm")
    );
  };

  const handlerResetReportsUAV = () => {
    setReportsUAV(initialState);
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