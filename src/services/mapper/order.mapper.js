const parse_sales_order = (data) => ({
  flow_stage: data.flow_stage,
});

const parse_vtex = (data) => ({
  status: data.status,
  operator_email: data.callCenterOperatorData?.email || null,
  shipping_address: data.shippingData.selectedAddresses[0] || null,
  cancellationData: data.cancellationData,
});

const parse_arg = (data) => {
  return data.map((item) => `v${item.substring(0, 6)}HOGA-${item.substring(6, 8)}`);
};

module.exports = {
  parse_sales_order,
  parse_vtex,
  parse_arg,
};
