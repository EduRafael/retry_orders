const parser_operator_vtex = (customer_vtex) => {
  const { userId, firstName, lastName, document, homePhone, phone } = customer_vtex;

  return {
    userId,
    firstName,
    lastName,
    document,
    phone,
    homePhone,
  };
};

module.exports = {
  parser_operator_vtex,
};
