'use client'

import FormSearch from "../components/FormSearch";
import TableReports from "../components/TableReports";
import useReports from "../hooks/useReports";

export default function GestorReportesPage() {

  const { reports, loading, handlerFindReports, handlerResetReports } = useReports();

  return (
    <div className="h-full  p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap justify-center gap-2">
        <FormSearch handlerFindReports={handlerFindReports}  handlerResetReports={handlerResetReports}/>
      </div>

      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
        <TableReports reports={reports}/>
      </div>
    </div>
  );
}
