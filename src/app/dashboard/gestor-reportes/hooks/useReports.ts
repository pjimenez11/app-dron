"use client";

import { useState } from "react";
import {
  FindReportsRequest,
  FindReportsResponse,
} from "../interfaces/findReports/reports-response.interface";
import {
  findByDays,
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../services/reports";
import { toast } from "react-toastify";
import { FindReportsRequestDays } from '../interfaces/findReports/reports-response.interface';
const useReports = () => {
  const [reports, setReports] = useState<FindReportsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerFindReportsDay = async (request: FindReportsRequest, idDrone: number) => {
    setLoading(true);
    try {
      const response = findReportsDay(request, idDrone);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsMonth = async (idDrone: number) => {
    setLoading(true);
    try {
      const response = findReportsMonth(idDrone);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsWeek = async (idDrone: number) => {
    setLoading(true);
    try {
      const response = findReportsWeek(idDrone);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsCurrent = async (idDrone: number) => {
    setLoading(true);
    try {
      const response = findReportsCurrent(idDrone);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsByDays = async (request: FindReportsRequestDays, idDrone: number) => {
    setLoading(true);
    try {
      const response = findByDays(request, idDrone);
      toast.promise(response, {
        pending: "Buscando reportes...",
        success: "Fin de la busqueda",
        error: "Error al buscar",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handlerResetReports = () => {
    setReports([]);
  };

  return {
    reports,
    loading,
    handlerFindReportsDay,
    handlerFindReportsMonth,
    handlerFindReportsWeek,
    handlerFindReportsCurrent,
    handlerResetReports,
    handlerFindReportsByDays
  };
};

export default useReports;
