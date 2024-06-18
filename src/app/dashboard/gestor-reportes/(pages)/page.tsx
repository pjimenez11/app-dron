"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import FormSearch from "../components/FormSearch";
import useReports from "../hooks/useReports";
import useGeneratePDF from "@/shared/hooks/useGeneratePDF";
import Combobox from "@/shared/components/combobox/Combobox";
import useFilter from "../hooks/useFilter";
import TablePanelesSolares from "../components/TablePanelesSolares";
import useUAV from "../hooks/useUAV";
import TableUAV from "../components/TableUAV";
import { DateRangePicker, RangeCalendar } from "@nextui-org/react";
import DataRange from "../components/DataRange";
import DeviseChart from "../components/DeviseChart";
import AreaChart from "../components/AreaChart";
import DroneMap from "@/shared/components/DronMap/DronMap";

const GestorReportesPage: React.FC = () => {
  const {
    reports,
    loading,
    handlerFindReportsDay,
    handlerFindReportsMonth,
    handlerFindReportsWeek,
    handlerFindReportsCurrent,
    handlerResetReports,
    handlerFindReportsByDays,
  } = useReports();

  const {
    handlerFindReportsCurrentUAV,
    handlerFindReportsDayUAV,
    handlerFindReportsMonthUAV,
    handlerFindReportsWeekUAV,
    handlerResetReportsUAV,
    reportsUAV,
    handlerFindReportsByDaysUAV,
    corriente,
    voltaje,
    promedioPorcentajeBateria,
    porcentajeBateria,
    labels,
  } = useUAV();

  const {
    filterDate,
    handleChangeDate,
    optionsFilterDate,
    filterDrone,
    handleChangeDrone,
    optionsDrones,
  } = useFilter({ handlerResetReports, handlerResetReportsUAV });

  const { user } = useAuthStore();

  const { contentRef, generatePDF } = useGeneratePDF();

  /* const cPan = reports.map((report) => report.);
  const vPan = reports.map((report) => report.vPan);
  const cBat = reports.map((report) => report.cBat);
  const vBat = reports.map((report) => report.vBat);
  const cCar = reports.map((report) => report.cCar);
  const vCar = reports.map((report) => report.vCar); */
  /* const lebels = reports.map((report) =>
    moment.utc(report.fecha_registro).format("HH:mm")
  ); */

  useEffect(() => {
    if (filterDrone !== "") {
      if (filterDate === "hoy") {
        handlerFindReportsCurrent(+filterDrone);
        handlerFindReportsCurrentUAV(+filterDrone);
      }
      if (filterDate === "semanal") {
        handlerFindReportsWeek(+filterDrone);
        handlerFindReportsWeekUAV(+filterDrone);
      }
      if (filterDate === "mensual") {
        handlerFindReportsMonth(+filterDrone);
        handlerFindReportsMonthUAV(+filterDrone);
      }
    }
  }, [filterDate, filterDrone]);

  return (
    <div className="h-full">
      <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center gap-2 md:gap-6 ">
        <Combobox
          label="Filtrar por:"
          options={optionsFilterDate}
          onChange={handleChangeDate}
          value={filterDate}
        />

        <Combobox
          label="Dron:"
          options={optionsDrones}
          onChange={handleChangeDrone}
          value={filterDrone}
        />

        {user?.role === "admin" && (
          <button className="btn-primary" onClick={() => generatePDF()}>
            Imprimir reporte
          </button>
        )}
      </div>
      {filterDate === "diario" && (
        <div className="bg-white mt-4 p-4 rounded-lg shadow-lg flex flex-wrap justify-center items-center gap-2 md:gap-6">
          <FormSearch
            handlerFindReports={handlerFindReportsDay}
            handlerResetReports={handlerResetReports}
            handlerFindReportsDayUAV={handlerFindReportsDayUAV}
            handlerResetReportsUAV={handlerResetReportsUAV}
            idDrone={+filterDrone}
          />
        </div>
      )}
      {filterDate === "personalizado" && (
        <DataRange
          handlerFindReportsByDays={handlerFindReportsByDays}
          handlerFindReportsByDaysUAV={handlerFindReportsByDaysUAV}
          handlerResetReports={handlerResetReports}
          handlerResetReportsUAV={handlerResetReportsUAV}
          idDrone={+filterDrone}
        />
      )}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
        <TablePanelesSolares reports={reports} />
      </div>

      <div className="mt-4 flex flex-row gap-4">
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
          <TableUAV reports={reportsUAV} />
          <DroneMap uavResponses={reportsUAV} />
        </div>
        <div className="w-1/3 gap-4 flex flex-col" ref={contentRef}>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <div>
              <DeviseChart
                c={corriente}
                v={voltaje}
                labelsDevise={labels()}
                title="UAV"
              />
            </div>
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <div>
              <AreaChart
                labelsDevise={labels()}
                textLabel="Porcentaje de bateria"
                title="UAV"
                values={porcentajeBateria}
              />
            </div>
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div className="border-[20px] border-blue-500 p-4 h-64 w-64 rounded-full flex flex-col justify-center items-center">
              {promedioPorcentajeBateria >= 0 ? (
                <p className="text-center text-md font-semibold">
                  Promedio de porcentaje de bateria:{" "}
                  {promedioPorcentajeBateria.toFixed(2)}%
                </p>
              ) : (
                <p className="text-center text-md font-semibold">
                  No hay datos de bateria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-4 flex flex-row gap-4">
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <TablePanelesSolares reports={reports} />
        </div>
        <div className="w-1/3 gap-4 flex flex-col">
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
        </div>
      </div> */}

      {/* {user?.role === "admin" && (
        <div
          ref={contentRef}
          className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <DeviseChart
              c={cPan}
              v={vPan}
              labelsDevise={lebels}
              title="Panel"
            />
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <DeviseChart
              c={cBat}
              v={vBat}
              labelsDevise={lebels}
              title="Bateria"
            />
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <DeviseChart
              c={cCar}
              v={vCar}
              labelsDevise={lebels}
              title="Cargador"
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GestorReportesPage;
