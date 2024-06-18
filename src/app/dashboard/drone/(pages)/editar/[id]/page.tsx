"use client";

import { set, SubmitHandler, useForm } from "react-hook-form";
import { DronForm } from "../../../interfaces/drones.interface";
import useDrone from "../../../hooks/useDrone";
import FormDrones from "../../../components/FormDrones";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { update } from "../../../services/drone";
import useUser from "@/app/dashboard/users/hooks/useUser";

export default function EditarPage() {
  const param = useParams();
  const { findDroneById, drones, updateDron, loading } = useDrone();
  const [idDron, setIdDron] = useState<number>(0);
  const router = useRouter();

  const { findUserByFullName, handlerGetUsers, users } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DronForm>();

  useEffect(() => {
    if (param.id) {
      const id = parseInt(param.id as string);
      const dron = findDroneById(id);
      if (dron) {
        reset({
          tipo_dron: dron.tipo_dron,
          capacidad_bateria: dron.capacidad_bateria,
          tipo_placa: dron.tipo_placa,
          max_viento_vuelo: dron.max_viento_vuelo,
          user_id: findUserByFullName(dron.user_name)?.id,
        });
        setIdDron(id);
      }

      if (!loading && !dron) {
        router.push("/dashboard/drone");
      }
    } else {
      router.push("/dashboard/drone");
    }
  }, [param, loading, reset, router, users]);

  const onSubmit: SubmitHandler<DronForm> = (data) => {
    if (idDron) {
      updateDron(data, idDron);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full  sm:w-4/5 md:w-3/5 lg:w-2/5">
        <h1 className="text-center text-2xl font-bold ">Editar Dron</h1>
        <FormDrones
          redirect="/dashboard/drone"
          textAction="Actualizar"
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
