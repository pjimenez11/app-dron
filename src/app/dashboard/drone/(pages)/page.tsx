"use client";

import Link from "next/link";
import TableDrones from "../components/TableDrones";
import useDrone from "../hooks/useDrone";

export default function DronesPage() {
  const { drones, removeDron } = useDrone();
  return (
    <div className="h-full">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold ">Drones</h1>
          <Link href={"/dashboard/drone/nuevo"} className="btn-primary">
            Nuevo Dron
          </Link>
        </div>
        <TableDrones drones={drones} deleteDron={removeDron} />
      </div>
    </div>
  );
}
