import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { DronForm } from "../interfaces/drones.interface";
import Link from "next/link";
import useUser from "../../users/hooks/useUser";

interface FormDronesProps {
  redirect: string;
  textAction: string;
  register: UseFormRegister<DronForm>;
  handleSubmit: UseFormHandleSubmit<DronForm, undefined>;
  onSubmit: SubmitHandler<DronForm>;
  errors: FieldErrors<DronForm>;
}

const FormDrones = ({
  redirect,
  textAction,
  register,
  handleSubmit,
  onSubmit,
  errors,
}: FormDronesProps) => {

  const { users } = useUser();
  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input1" className="block text-sm text-gray-800">
          Tipo de dron
        </label>
        <select
          className="input mt-1"
          {...register("tipo_dron", {
            required: "El tipo de dron es requerido",
          })}
        >
          <option value="">Seleccionar...</option>
          <option value="multirotor">Multirotor</option>
          <option value="ala_fija">Ala Fija</option>
        </select>
        <label htmlFor="input1" className="block text-sm text-red-500">
          {errors.tipo_dron?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input2" className="block text-sm text-gray-800">
          Capacidad de batería
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("capacidad_bateria", {
            required: "La capacidad de batería es requerida",
            onChange: (e) => {
              if (isNaN(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
              }
            },
          })}
        />
        <label htmlFor="input2" className="block text-sm text-red-500">
          {errors.capacidad_bateria?.message} &nbsp;
        </label>
      </div>

      <div>
        <label htmlFor="input3" className="block text-sm text-gray-800">
          Maximo viento de vuelo
        </label>
        <input
          type="text"
          className="input mt-1"
          {...register("max_viento_vuelo", {
            required: "El maximo viento de vuelo es requerido",
            onChange: (e) => {
              if (isNaN(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
              }
            },
          })}
        />
        <label htmlFor="input3" className="block text-sm text-red-500">
          {errors.max_viento_vuelo?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label htmlFor="input4" className="block text-sm text-gray-800">
          Tipo de placa
        </label>
        <select
          className="input mt-1"
          {...register("tipo_placa", {
            required: "El tipo de placa es requerido",
          })}
        >
          <option value="">Seleccionar...</option>
          <option value="flexible">Flexible</option>
          <option value="monocristalina">Monocristalina</option>
          <option value="policristalina">Policristalina</option>
        </select>
        <label htmlFor="input4" className="block text-sm text-red-500">
          {errors.tipo_placa?.message} &nbsp;
        </label>
      </div>

      <div className="mt-1">
        <label htmlFor="input5" className="block text-sm text-gray-800">
          Usuario
        </label>
        <select
          className="input mt-1"
          {...register("user_id", {
            required: "El usuario es requerido",
          })}
        >
          <option value="">Seleccionar...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombre + " " + user.apellido}
            </option>
          ))}
        </select>
        <label htmlFor="input5" className="block text-sm text-red-500">
          {errors.user_id?.message} &nbsp;
        </label>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button type="submit" className=" btn-primary">
          {textAction}
        </button>
        <Link href={redirect} className=" btn-danger">Cancelar</Link>
      </div>
    </form>
  );
};

export default FormDrones;
