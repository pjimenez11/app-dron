import DroneMap from "@/shared/components/DronMap/DronMap";
import useCargaAC from "../../hooks/CargaAC/useCargaAC";
import DeviseChart from "../DeviseChart";
import AreaChart from "../AreaChart";
import { use, useEffect } from "react";
import Combobox from "@/shared/components/combobox/Combobox";
import FormSearch from "../FormSearch";
import DataRange from "../DataRange";
import { FindReportsRequest } from "../../interfaces/findReports/paneles-solares.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useDateRange from "../../hooks/useDateRange";
import useFilter from "../../hooks/useFilter";
import TableCargaAC from "./TableCargaAC";

const SeccionCargaAC = () => {
  const {
    handlerFindReportsByDaysCargaAC,
    handlerFindReportsCurrentCargaAC,
    handlerFindReportsDayCargaAC,
    handlerFindReportsMonthCargaAC,
    handlerFindReportsWeekCargaAC,
    reportsCargaAC,
    loadingCargaAC,
    handlerResetReportsCargaAC,
  } = useCargaAC();

  const {
    filterDate,
    handleChangeDate,
    optionsFilterDate,
    filterDrone,
    handleChangeDrone,
    optionsDrones,
  } = useFilter({ handlerResetReports: handlerResetReportsCargaAC });

  useEffect(() => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrentCargaAC(+filterDrone);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeekCargaAC(+filterDrone);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonthCargaAC(+filterDrone);
    }
  }, [filterDate, filterDrone]);

  const initialForm: FindReportsRequest = {
    fecha: "",
    time1: "",
    time2: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FindReportsRequest>({ defaultValues: initialForm });

  const onSubmit: SubmitHandler<FindReportsRequest> = (data) => {
    if (+filterDrone === 0) return toast.error("Seleccione un dron");
    handlerFindReportsDayCargaAC(data, +filterDrone);
  };

  const handleReset = () => {
    handlerResetReportsCargaAC();
    reset(initialForm);
  };

  const { date, setDate, fechaRequest } = useDateRange({
    idDrone: +filterDrone,
    handlerFindReportsByDays: handlerFindReportsByDaysCargaAC,
    handlerResetReports: handlerResetReportsCargaAC,
  });

  const onPagination = (page: number) => {
    if (!filterDrone) return;
    if (filterDate === "hoy") {
      handlerFindReportsCurrentCargaAC(+filterDrone, page);
    }
    if (filterDate === "semanal") {
      handlerFindReportsWeekCargaAC(+filterDrone, page);
    }
    if (filterDate === "mensual") {
      handlerFindReportsMonthCargaAC(+filterDrone, page);
    }
    if (filterDate === "personalizado") {
      handlerFindReportsByDaysCargaAC(fechaRequest, +filterDrone, page);
    }
    if (filterDate === "diario") {
      handlerFindReportsDayCargaAC(watch(), +filterDrone, page);
    }
  };

  return (
    <>
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
      </div>
      {filterDate === "diario" && (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap justify-center items-center gap-2 md:gap-6">
          <FormSearch
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            onSubmit={onSubmit}
            handleReset={handleReset}
          />
        </div>
      )}
      {filterDate === "personalizado" && (
        <DataRange date={date} setDate={setDate} />
      )}
      <div className="flex flex-row gap-4">
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
          <TableCargaAC uvs={reportsCargaAC} onPagination={onPagination} />
        </div>
        {/* <div className="w-1/3 gap-4 flex flex-col">
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <div>
              <DeviseChart
                c={corriente}
                v={voltaje}
                labelsDevise={labels()}
                title="CargaAC"
              />
            </div>
          </div>
          <div className="chart-container bg-white p-4 rounded-lg shadow-lg">
            <div>
              <AreaChart
                labelsDevise={labels()}
                textLabel="Porcentaje de bateria"
                title="CargaAC"
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
        </div> */}
      </div>
    </>
  );
};

export default SeccionCargaAC;
