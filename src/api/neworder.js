import ajax from "./base";

export async function addOrder(order) {
  var tableName = "customers";
  var region = parseInt(order.Region);
  var values = `${null},'${order.FirstName}','${order.LastName}','${
    order.Phone
  }','${order.Email}','${order.BillingAddress}','${order.City}','${
    order.PostalCode
  }',${region}`;

  var orders = await ajax("/insertValues", { tableName, values }, "post");
  console.log("cusotmers", orders);
  if (orders !== []) return orders;
  else {
    return 0;
  }
}
