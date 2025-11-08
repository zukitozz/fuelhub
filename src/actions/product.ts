import { Constants } from "@/constants";
import { IPagination, IProduct, IRutaResponse } from "@/interfaces";
import axios from "axios";

export const registerProduct = async( product: IProduct ) => {
  try {
  
    const response = await axios.post(`${Constants.API_URL}/route`, {
      ...product
    },{headers: {'content-type': 'application/json'}});

    return {
      result: true,
      message: 'Producto enviado',
      comprobante: response.data.comprobante
    }

  } catch (error) {
    console.log(error);

    return {
      result: false,
      message: 'No se pudo crear el usuario',
      comprobante: {}
    }
  }
}



export const listProducts = async(url: string, pagination: IPagination | null): Promise<IRutaResponse> => {
  try {
    const params: any = {
      limit: 10
    }
    if(pagination && pagination.lastValue){
      params.start = JSON.stringify(pagination.lastValue);
    }

    const historic = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json"
      },
      params
    });
    return {
      result: true,
      message: 'Respuesta satisfactoria',
      historic: historic.data || [],
    }
  }catch (error) {
    return {
      result: false,
      message: 'No se pudo obtener la lista de comprobantes' + error,
      historic: {
        items: [],
        lastEvaluatedKey: null
      }
    }
  }
}
