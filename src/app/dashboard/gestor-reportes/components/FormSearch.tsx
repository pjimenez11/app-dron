"use client";

import { HiSearch } from "react-icons/hi";
import { FindReportsRequest } from "../interfaces/findReports/reports-response.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import useReports from "../hooks/useReports";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface FormSearchProps {
  idDrone: number;
  handlerFindReports: (
    request: FindReportsRequest,
    idDrone: number
  ) => Promise<void>;
  handlerResetReports: () => void;
  handlerResetReportsUAV: () => void;
  handlerFindReportsDayUAV: (
    request: FindReportsRequest,
    idDrone: number
  ) => Promise<void>;
}

const FormSearch = ({
  idDrone,
  handlerFindReports,
  handlerResetReports,
  handlerFindReportsDayUAV,
  handlerResetReportsUAV,
}: FormSearchProps) => {
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
    if (idDrone === 0) return toast.error("Seleccione un dron");
    handlerFindReports(data, idDrone);
    handlerFindReportsDayUAV(data, idDrone);
  };

  const handleReset = () => {
    handlerResetReports();
    handlerResetReportsUAV();
    reset(initialForm);
  };

  return (
    <form
      className="flex flex-wrap gap-2 md:gap-6 items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <label htmlFor="date" className="text-gray-700">
          Fecha
        </label>
        <div>
          <input
            type="date"
            id="date"
            className="input"
            {...register("fecha", { required: "La fecha es requerida" })}
          />
          <label htmlFor="date" className="block text-sm text-red-500">
            {errors.fecha?.message}
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <label htmlFor="time1" className="text-gray-700">
          De
        </label>
        <div>
          <input
            type="time"
            id="time1"
            className="input"
            {...register("time1", { required: "La hora es requerida" })}
          />
          <label htmlFor="time1" className="block text-sm text-red-500">
            {errors.time1?.message}
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <label htmlFor="time2" className="text-gray-700">
          A
        </label>
        <div>
          <input
            type="time"
            id="time2"
            className="input"
            {...register("time2", {
              required: "La hora es requerida",
              validate: (value) =>
                value > watch("time1") ? true : "La hora debe ser mayor",
            })}
          />
          <label htmlFor="time2" className="block text-sm text-red-500">
            {errors.time2?.message}
          </label>
        </div>
      </div>

      <button type="submit" className="btn-secondary">
        <HiSearch className="w-6 h-6" />
      </button>

      <button type="reset" className="btn-danger" onClick={handleReset}>
        Restablecer
      </button>
    </form>
  );
};

export default FormSearch;
