"use client";

import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FindReportsRequestDays } from "../interfaces/findReports/reports-response.interface";
import { toast } from "react-toastify";

interface DateRangePickerProps {
  idDrone: number;
  handlerResetReports: () => void;
  handlerFindReportsByDays: (
    request: FindReportsRequestDays,
    idDrone: number
  ) => Promise<void>;
  handlerResetReportsUAV: () => void;
  handlerFindReportsByDaysUAV: (
    request: FindReportsRequestDays,
    idDrone: number
  ) => Promise<void>;
}

const DataRange = ({
  idDrone,
  handlerFindReportsByDays,
  handlerFindReportsByDaysUAV,
  handlerResetReports,
  handlerResetReportsUAV,
}: DateRangePickerProps) => {
  const [date, setDate] = useState<RangeValue<DateValue> | null>(null);

  useEffect(() => {
    onSubmit();
  }, [date]);

  const onSubmit = () => {
    if (date) {
      //VALIDAR SI LA FECHA INICIAL ES MAYOR A LA FINAL

      const { start, end } = date;

      if (start === null || end === null) return;
      if (start.year > end.year) return;
      if (start.month > end.month) return;
      if (start.day > end.day) return;
      const request: FindReportsRequestDays = {
        fecha1: `${start.year}-${start.month}-${start.day}`,
        fecha2: `${end.year}-${end.month}-${end.day}`,
      };

      if (idDrone === 0) return toast.error("Seleccione un dron");
      handlerFindReportsByDays(request, idDrone);
      handlerFindReportsByDaysUAV(request, idDrone);
    } else {
      handlerResetReports();
      handlerResetReportsUAV();
    }
  };
  return (
    <div className="bg-white mt-4 p-4 rounded-lg shadow-lg">
      <DateRangePicker
        label="Seleccione el rango de fecha"
        value={date}
        onChange={setDate}
      />
    </div>
  );
};

export default DataRange;
