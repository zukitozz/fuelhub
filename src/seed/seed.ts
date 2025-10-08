import { IConductor, IDestinatario, IOrigen, IRemitente, IRuta, IVehiculo } from "@/interfaces";
export interface SeedData {
    vehiculos: IVehiculo[],
    remitentes: IRemitente[],
    destinatarios: IDestinatario[],
    conductores: IConductor[],
    origenes: IOrigen[],
    rutas: IRuta[]
}




export const initialData: SeedData = {
    vehiculos: [
        {placa: 'AJA914', tuc: '151716053236556'},
        {placa: 'BYC810', tuc: '151716053236556'}
    ],
    remitentes: [
        {
            tipo_documento: '6',
            numero_documento: '20605858601',
            razon_social: 'GRUPO EMPRESARIAL NONATO E.I.R.L.',
            ubigeo: '150101',
            direccion: 'CAR. PANAMERICANA SUR KM. 87.5 LOTE. 1 LIMA CAÑETE MALA',
            correo: '987654321',
            nombre_comercial: 'GRUPO EMPRESARIAL NONATO E.I.R.L.',
            token_mifact: "IolOxCvrKdSnZ0lYcWH/eA=="
        },
        {
            tipo_documento: '6',
            numero_documento: '20612024821',
            razon_social: 'GRUPO NONATO ANDAHUASI E.I.R.L.',
            ubigeo: '150101',
            direccion: 'CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN',
            correo: '987654321',
            nombre_comercial: 'GRUPO NONATO ANDAHUASI E.I.R.L.',
            token_mifact: "l7Eo1p72cF+nZ0lYcWH/eA=="
        },
        {
            tipo_documento: '6',
            numero_documento: '20612016527',
            razon_social: 'GRUPO NONATO CHANCAYLLO E.I.R.L.',
            ubigeo: '150101',
            direccion: 'KM. 87.5 LOTE. 07 C.P. CARRETERA PANAMERICANA NO LIMA HUARAL CHANCAY',
            correo: '987654321',
            nombre_comercial: 'GRUPO NONATO CHANCAYLLO E.I.R.L.',
            token_mifact: "l7Eo1p72cF+6dkooMaHrWg=="
        },
        {
            tipo_documento: '6',
            numero_documento: '20609785269',
            razon_social: 'SIRCON PACHACUTEC E.I.R.L.',
            ubigeo: '150101',
            direccion: 'AV. AVENIGA G MZA. W4 LOTE. 1 RES. GRUPO RESIDENCIAL D1 PROV. CONST. DEL CALLAO PROV. CONST',
            correo: '987654321',
            nombre_comercial: 'SIRCON PACHACUTEC E.I.R.L.',
            token_mifact: "tOcEEdPoW/SnZ0lYcWH/eA=="
        }                        
    ],
    destinatarios: [
        {
            tipo_documento: '6',
            numero_documento: '20605858601',
            razon_social: 'GRUPO EMPRESARIAL NONATO E.I.R.L.',
            ubigeo: '140408',
            direccion: 'CAR. PANAMERICANA SUR KM. 87.5 LOTE. 1 LIMA CAÑETE MALA',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20612024821',
            razon_social: 'GRUPO NONATO ANDAHUASI E.I.R.L.',
            ubigeo: '140513',
            direccion: 'CAR. HUAURA SAYAN KM. 40.5 LOTE. 7 SEC. SAN JUAN DE CAÑAS LIMA HUAURA SAYAN',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20612016527',
            razon_social: 'GRUPO NONATO CHANCAYLLO E.I.R.L.',
            ubigeo: '140805',
            direccion: 'KM. 87.5 LOTE. 07 C.P. CARRETERA PANAMERICANA NO LIMA HUARAL CHANCAY',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20609785269',
            razon_social: 'SIRCON PACHACUTEC E.I.R.L.',
            ubigeo: '240106',
            direccion: 'AV. AVENIGA G MZA. W4 LOTE. 1 RES. GRUPO RESIDENCIAL D1 PROV. CONST. DEL CALLAO PROV. CONST',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '10225180721',
            razon_social: 'BERLINA CIERTO ROJAS',
            ubigeo: '140106',
            direccion: 'LOTE 1 SUB LOTE 3 ZONA G PARCELA RUSTICA DEL FUNDO CHACRA CERRO - COMAS - LIMA',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '10225126157',
            razon_social: 'FAUSTO NONATO RAMOS',
            ubigeo: '140139',
            direccion: 'AV. SAN MARTIN KM. 17.8 MZ. C LOTE 2 Y 3 . ASOC. DE VIVIENDAS LA ESPERANZA DE CIENEGUILLA - CIENEGUILLA - LIMA',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20602092381',
            razon_social: 'ESTACION DE SERVICIOS NONATO E.I.R.L.',
            ubigeo: '240106',
            direccion: 'AV. LOS ARQUITECTOS MZA. A LOTE. 12 SEC. G BARRIO XV GRUPO RESIDENCIAL 4 PROYECTO ESPECIAL PACHACUTEC (MZ A, LOTES 10 Y 12) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20600850157',
            razon_social: 'ESTACION DE SERVICIOS BERLI E.I.R.L.',
            ubigeo: '140106',
            direccion: 'AV. HEROES DEL ALTO CENEPA MZA. G LOTE. 01 ASC. FUNDO CHACRA LIMA - LIMA - COMAS',
            correo: '987654321'
        },
        {
            tipo_documento: '6',
            numero_documento: '20603538065',
            razon_social: 'SIRCON ENERGY EIRL',
            ubigeo: '240106',
            direccion: 'AV. AV NESTOR GAMBETA KM. 6.5 OTR. AV NESTOR GAMBETA, KM 6.5 PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - VENTANILLA',
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
        },
        {
            usuario: 'vquezada',
            tipo_documento: '1',
            numero_documento: '45209261',
            nombres: 'Carlos Eduardo Zevallo Guerreo',
            licencia: 'Y45209261',
            nro_registro_mtc: 'Y45209261'
        }       
    ],
    origenes: [
        {
           id: "1", ubigeo: '150107', nombre: 'CONCHAN', direccion: 'CARRETERA PANAMERICANA SUR KM 26.5 - LURIN - LIMA - LIMA'
        },
        {
           id: "2", ubigeo: '070101', nombre: 'CALLAO', direccion: 'AV. NESTOR GAMBETA NRO. 1265 Z.I. .- PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO'
        },
        {
           id: "3", ubigeo: '240106', nombre: 'VALERO', direccion: 'AVENIDA NESTOR GAMBETTA 3500'
        },
        {
           id: "4", ubigeo: '240106', nombre: 'PAMPILLA', direccion: 'Carretera a Ventanilla, Km. 25, Callao 6. 7051 Prov. Const. Del Callao. Peru'
        }            
    ],
    rutas: [
        { ubigeo_origen: '150107', ubigeo_destino: '140408', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '150107', ubigeo_destino: '140513', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '150107', ubigeo_destino: '140805', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '150107', ubigeo_destino: '240106', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '070101', ubigeo_destino: '140408', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '070101', ubigeo_destino: '140513', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '070101', ubigeo_destino: '140805', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '070101', ubigeo_destino: '240106', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '240106', ubigeo_destino: '140408', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '240106', ubigeo_destino: '140513', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '240106', ubigeo_destino: '140805', precio_galon: 0.1166666666666667 },
        { ubigeo_origen: '240106', ubigeo_destino: '150107', precio_galon: 0.1166666666666667 }
    ]
}