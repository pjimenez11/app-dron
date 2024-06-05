"use client";

import { useEffect, useState } from "react";
import {
  FindReportsRequest,
  FindReportsResponse,
} from "../interfaces/findReports/reports-response.interface";
import { findReports } from "../services/reports";
import { toast } from "react-toastify";
const useReports = () => {
  const [reports, setReports] = useState<FindReportsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerFindReports = async (request: FindReportsRequest) => {
    setLoading(true);
    try {
      const response = findReports(request);
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
    handlerFindReports,
    handlerResetReports,
  };
};

export default useReports;
