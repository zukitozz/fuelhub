export const Constants = {
    API_URL: 'https://r4pr2pvb3m.execute-api.us-east-2.amazonaws.com/prod',
    TIMEOUT: 5000,
    MAX_RETRIES: 3,
    SERIE_GUIA_REMISION_REMITENTE: 'T001',
    SERIE_FACTURA: 'F001',
    SERIE_GUIA_REMISION_TRANSPORTISTA: 'VG01',
    RUC_EMPRESA: '20100011884',
    USUARIO_DEFAULT: 'jcastillo',
    TIPO_COMPROBANTE: {
        FACTURA: '01',
        BOLETA: '03',
        NOTA_CREDITO: '07',
        NOTA_DEBITO: '08',
        GUIA_REMISION_TRANSPORTISTA: '31',
        GUIA_REMISION_REMITENTE: '09',
    },
    PESO_BRUTO_DEFAULT: 6155,
    PESO_GALON_DIESEL: 3.2,
    PESO_GALON_GASOHOL: 2.8,
    ETAPA_FACTURACION: {
        CREADO: 'CREATED',
        POR_ENVIAR: 'DISPATCH',
        ENVIADO: 'SENT',
    }
}