"use client";

import { useState } from "react";
import {
  FindReportsRequest,
  FindReportsResponse,
} from "../interfaces/findReports/reports-response.interface";
import {
  findReportsCurrent,
  findReportsDay,
  findReportsMonth,
  findReportsWeek,
} from "../services/reports";
import { toast } from "react-toastify";
const useReports = () => {
  const [reports, setReports] = useState<FindReportsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerFindReportsDay = async (request: FindReportsRequest) => {
    setLoading(true);
    try {
      const response = findReportsDay(request);
      toast.promise(response, {
        pending: "Buscando reportes",
        success: "Fin de la busqueda 👌",
        error: "Error al buscar 🤯",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsMonth = async () => {
    setLoading(true);
    try {
      const response = findReportsMonth();
      toast.promise(response, {
        pending: "Buscando reportes",
        success: "Fin de la busqueda 👌",
        error: "Error al buscar 🤯",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsWeek = async () => {
    setLoading(true);
    try {
      const response = findReportsWeek();
      toast.promise(response, {
        pending: "Buscando reportes",
        success: "Fin de la busqueda 👌",
        error: "Error al buscar 🤯",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlerFindReportsCurrent = async () => {
    setLoading(true);
    try {
      const response = findReportsCurrent();
      toast.promise(response, {
        pending: "Buscando reportes",
        success: "Fin de la busqueda 👌",
        error: "Error al buscar 🤯",
      });
      const data = await response;
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
  };
};

export default useReports;
