import { IConductor, IDestinatario, IOrigen, IRemitente, IVehiculo } from "@/interfaces";
interface SeedData {
    vehiculos: IVehiculo[],
    remitentes: IRemitente[],
    destinatarios: IDestinatario[],
    conductores: IConductor[],
    origenes: IOrigen[],
}




export const initialData: SeedData = {
    vehiculos: [
        {placa: 'ABC123', tuc: 'TUC123'},
        {placa: 'ABC125', tuc: 'TUC125'}
    ],
    remitentes: [
        {
            tipo_documento: '6',
            numero_documento: '20605858601',
            razon_social: 'GRUPO EMPRESARIAL NONATO E.I.R.L.',
            ubigeo: '150101',
            direccion: 'CAR. PANAMERICANA SUR KM. 87.5 LOTE. 1 LIMA CAÑETE MALA',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20612024821',
            razon_social: 'GRUPO NONATO ANDAHUASI E.I.R.L.',
            ubigeo: '150101',
            direccion: 'CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20612016527',
            razon_social: 'GRUPO NONATO CHANCAYLLO E.I.R.L.',
            ubigeo: '150101',
            direccion: 'KM. 87.5 LOTE. 07 C.P. CARRETERA PANAMERICANA NO LIMA HUARAL CHANCAY',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20609785269',
            razon_social: 'SIRCON PACHACUTEC E.I.R.L.',
            ubigeo: '150101',
            direccion: 'AV. AVENIGA G MZA. W4 LOTE. 1 RES. GRUPO RESIDENCIAL D1 PROV. CONST. DEL CALLAO PROV. CONST',
            correo: '987654321'
        }                        
    ],
    destinatarios: [
        {
            tipo_documento: '6',
            numero_documento: '20605858601',
            razon_social: 'GRUPO EMPRESARIAL NONATO E.I.R.L.',
            ubigeo: '150101',
            direccion: 'CAR. PANAMERICANA SUR KM. 87.5 LOTE. 1 LIMA CAÑETE MALA',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20612024821',
            razon_social: 'GRUPO NONATO ANDAHUASI E.I.R.L.',
            ubigeo: '150101',
            direccion: 'CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20612016527',
            razon_social: 'GRUPO NONATO CHANCAYLLO E.I.R.L.',
            ubigeo: '150101',
            direccion: 'KM. 87.5 LOTE. 07 C.P. CARRETERA PANAMERICANA NO LIMA HUARAL CHANCAY',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20609785269',
            razon_social: 'SIRCON PACHACUTEC E.I.R.L.',
            ubigeo: '150101',
            direccion: 'AV. AVENIGA G MZA. W4 LOTE. 1 RES. GRUPO RESIDENCIAL D1 PROV. CONST. DEL CALLAO PROV. CONST',
            correo: '987654321'
        }                        
    ],
    conductores: [
        {
            usuario: 'shuaman',
            tipo_documento: '1',
            numero_documento: '77208486',
            nombres: 'Steven Brajan Huaman Reyna',
            licencia: 'Q77208486',
            nro_registro_mtc: 'Q77208486'
        },
        {
            usuario: 'vquezada',
            tipo_documento: '1',
            numero_documento: '42629411',
            nombres: 'Victor Jonathan Quezada Reyna',
            licencia: 'Q42629411',
            nro_registro_mtc: 'Q42629411'
        }        
    ],
    origenes: [
        {
           id: "1", ubigeo: '150107', nombre: 'CONCHAN', direccion: 'CARRETERA PANAMERICANA SUR KM 26.5 - LURIN - LIMA - LIMA'
        },
        {
           id: "2", ubigeo: '240101', nombre: 'CALLAO', direccion: 'AVENIDA NESTOR GAMBETTA 1176'
        },
        {
           id: "3", ubigeo: '240106', nombre: 'VALERO', direccion: 'AVENIDA NESTOR GAMBETTA 3500'
        },
        {
           id: "4", ubigeo: '240106', nombre: 'PAMPILLA', direccion: 'Carretera a Ventanilla, Km. 25, Callao 6. 7051 Prov. Const. Del Callao. Peru'
        }            
    ]
}