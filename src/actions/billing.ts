import { Constants } from "@/constants";
import { IBilling, ICarrier } from "@/interfaces";
import axios from "axios";

export const registerBilling = async( billing: IBilling|ICarrier ) => {
  try {
  
    const response = await axios.post(`${Constants.API_URL}/billing`, {
      ...billing
    },{headers: {'content-type': 'application/json'}});

    return {
      result: true,
      message: 'Comprobante enviado',
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

export const listBilling = async(url: string) => {
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

    const historic = await axios.get(url, {
      headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        fecha_emision: '2025-09-26'
      }
    });
    console.log(historic);
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