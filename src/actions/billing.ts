import { Constants } from "@/constants";
import { ApproveGuiaRequest, IBilling, ICarrier, ILastEvaluatedKey, IPagination } from "@/interfaces";
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



export const listBilling = async(url: string, fecha_emision: Date | null, pagination: IPagination | null) => {
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

    const formattedDate = fecha_emision?.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const params: any = {
      fecha_emision: formattedDate,
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

export const aproveBilling = async(billing: ApproveGuiaRequest) => {
  try {
    const response = await axios.put(`${Constants.API_URL}/billing`, {
      ...billing
    }, { headers: { 'content-type': 'application/json' } });

    return {
      result: true,
      message: 'Comprobante actualizado',
      comprobante: response.data.comprobante
    }

  } catch (error) {
    console.log(error);

    return {
      result: false,
      message: 'No se pudo actualizar el comprobante',
      comprobante: {}
    }
  }
}
