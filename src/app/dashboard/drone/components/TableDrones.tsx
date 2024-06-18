"use client";

import Link from "next/link";
import { Dron } from "../interfaces/drones.interface";
import { TIPO_DRON, TIPO_PLACA } from "../constantes/dronConstantes";

interface TableDronesProps {
  drones: Dron[];
  deleteDron: (id: number) => void;
}

const TableDrones = ({ drones, deleteDron }: TableDronesProps) => {
  

  return (
    <section className="container mx-auto">
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              {drones.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Tipo de dron
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Capacidad de batería
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Max viento de vuelo
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Tipo de placa
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Usuario
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200  ">
                    {drones.map((dron) => (
                      <tr key={dron.id}>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {TIPO_DRON[dron.tipo_dron]}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {dron.capacidad_bateria}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {dron.max_viento_vuelo}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {TIPO_PLACA[dron.tipo_placa]}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {dron.user_name}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500 flex gap-2">
                          <Link href={`/dashboard/drone/editar/${dron.id}`} className="btn-secondary">Editar</Link>
                          <button className="btn-danger" onClick={() => deleteDron(dron.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="w-full items-center justify-center flex flex-col h-60">
                  <h1 className="mt-3 text-lg text-gray-800 ">
                    No hay drones registrados
                  </h1>
                  <p className="mt-2 text-gray-500">
                    Registra un nuevo dron para comenzar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableDrones;
