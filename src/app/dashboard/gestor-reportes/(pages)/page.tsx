"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import ConsumoTXChart from "../components/ConsumoTXChart";
import FormSearch from "../components/FormSearch";
import TableReports from "../components/TableReports";
import useReports from "../hooks/useReports";
import useGeneratePDF from "@/shared/hooks/useGeneratePDF";
import DeviseChart from "../components/DeviseChart";
import moment from "moment";

const GestorReportesPage: React.FC = () => {
  const { reports, loading, handlerFindReports, handlerResetReports } =
    useReports();

  const { user } = useAuthStore();

  const { contentRef, generatePDF } = useGeneratePDF();

  const cPan = reports.map((report) => report.cPan);
  const vPan = reports.map((report) => report.vPan);
  const cBat = reports.map((report) => report.cBat);
  const vBat = reports.map((report) => report.vBat);
  const cCar = reports.map((report) => report.cCar);
  const vCar = reports.map((report) => report.vCar);
  const lebels = reports.map((report) => moment.utc(report.fecha_registro).format("HH:mm"));

  return (
    <div className="h-full  p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap justify-center items-center gap-2 md:gap-6">
        <FormSearch
          handlerFindReports={handlerFindReports}
          handlerResetReports={handlerResetReports}
        />

        <button className="btn-primary" onClick={() => generatePDF()}>
          Imprimir reporte
        </button>
      </div>
      {user?.role === "user" && (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
        <TableReports reports={reports} />
      </div>
      )}
      {user?.role === "admin" && (
        <div
          ref={contentRef}
          className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <DeviseChart c={cPan} v={vPan} labelsDevise={lebels} title="Panel" />
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <DeviseChart c={cBat} v={vBat} labelsDevise={lebels} title="Bateria" />
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <DeviseChart c={cCar} v={vCar} labelsDevise={lebels} title="Cargador" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorReportesPage;
