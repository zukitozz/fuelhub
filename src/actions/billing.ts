import { IBilling, ICarrier } from "@/interfaces";

export const registerBilling = async( billing: IBilling, carrier: ICarrier) => {

  try {
    
    // const user = await prisma.user.create({
    //   data: {
    //     name: name,
    //     email: email.toLowerCase(),
    //     password: bcryptjs.hashSync( password ),
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //   }
    // })

    return {
      result: true,
      message: 'Comprobante enviado'
    }

  } catch (error) {
    console.log(error);

    return {
      result: false,
      message: 'No se pudo crear el usuario'
    }
  }
}