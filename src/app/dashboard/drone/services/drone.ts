import droneApi from "@/config/apiRoute";
import { Dron, DronForm } from "../interfaces/drones.interface";

const BASE_URL = "/uavs";

export const getAll = async (): Promise<Dron[]> => {
  try {
    const response = await droneApi.get(`${BASE_URL}`);
    const dataResponse = response.data as Dron[];
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const create = async (request: DronForm): Promise<Dron> => {
  try {
    const response = await droneApi.post(`${BASE_URL}`, request);
    const dataResponse = response.data as Dron;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const update = async (request: DronForm, id: number): Promise<Dron> => {
  try {
    const response = await droneApi.put(`${BASE_URL}/${id}`, request);
    const dataResponse = response.data as Dron;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number): Promise<Dron> => {
  try {
    const response = await droneApi.delete(`${BASE_URL}/${id}`);
    const dataResponse = response.data as Dron;
    return dataResponse;
  } catch (error) {
    throw error;
  }
};
