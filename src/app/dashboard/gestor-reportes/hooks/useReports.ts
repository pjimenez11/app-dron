"use client";

import { useEffect, useState } from "react";
import {
  FindReportsRequest,
  FindReportsResponse,
} from "../interfaces/findReports/reports-response.interface";
import { findReports } from "../services/reports";
const useReports = () => {
  const [reports, setReports] = useState<FindReportsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerFindReports = async (request: FindReportsRequest) => {
    setLoading(true);
    try {
      const response = await findReports(request);
      setReports(response);
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
