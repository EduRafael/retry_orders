module.exports = {
  TYPE: {
    ORDER: 'ORDER',
    OPERATOR: 'OPERATOR',
  },
  MESSAGE: {
    SUCCESS: {
      GET_OPERATOR_VTEX: 'GET_OPERATOR_VTEX_SUCCESS',
      GET_OPERATOR_SO: 'GET_OPERATOR_SO_SUCCESS',
      OK_SO: 'El flujo parece completo, verificar en el boc',
    },
    ERROR: {
      ORDER_NF: 'ORDER NOT FOUD, CONTINUE NEXT',
      OPERATOR_NF: 'ORPERATOR NOT FOUD, CONTINUE NEXT',
      QUERY_AXIOS: 'UNEXPECTED ERROR',
      OPERATOR_VTEX_FN: 'OPERATOR_VTEX_NULL_FIELD',
      OPERATOR_VTEX_DNF: 'OPERATOR_VTEX_DATA_NOT_FOUND',
      OPERATOR_SO_DNF: 'OPERATOR_SO_DATA_NOT_FOUND',
      ERROR_SO: 'Verificar orden en la etapa descrita',
      SO_NF: 'No se encontró el flow stage en so',
    },
  },
};
