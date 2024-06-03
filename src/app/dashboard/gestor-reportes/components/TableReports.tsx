"use client";

import useReports from "../hooks/useReports";
import { FindReportsResponse } from '../interfaces/findReports/reports-response.interface';

interface TableReportsProps {
  reports: FindReportsResponse[];
}

const TableReports = ({reports}: TableReportsProps) => {

  return (
    <section className="container px-4 mx-auto">
      <div className="flex justify-between gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">
          Muestreo cada 5 minutos
        </h2>
        <button className="btn-primary">Imprimir reporte</button>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Vp
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Cp
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Vb
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Cb
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Vc
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Cc
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200  ">
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.fecha}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.vp}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.cp}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.vb}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.cb}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.vc}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">
                        {report.cc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableReports;
