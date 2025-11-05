import { Constants } from "@/constants";
import { IPagination, IProduct } from "@/interfaces";
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



export const listProducts = async(url: string, pagination: IPagination | null) => {
  try {
    //const user = await posApi.get('https://tiyzbrfo75.execute-api.us-east-2.amazonaws.com/prod/billing', { withCredentials: false });
    // const user = await axios({
    //   method: 'get',
    //   headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'origin':'x-requested-with',
    //       'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    //       "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //       'Content-Type': 'application/json',
    //   },      
    //   url: 'https://tiyzbrfo75.execute-api.us-east-2.amazonaws.com/prod/billing',
    //   withCredentials: false
    // })
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
      historic: historic.data || [],
    }
  }catch (error) {
    return {
      result: false,
      message: 'No se pudo obtener la lista de comprobantes',
    }
  }
}
