import ajax from "./base";
import base from "./base";

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
export async function addEstimate(order) {
  var tableName = "estimates";
  var region = parseInt(order.Region);
  var values = `${null},'1','1','1','${order.JobType}','${Date.now()}','${
    order.EstimateInfo
  }','${Date.now()}',${Date.now()},${region}`;

  var orders = await ajax("/insertValues", { tableName, values }, "post");
  if (orders !== []) return orders;
  else {
    return 0;
  }
}

export async function getEstimates() {
  var tableName = "estimates";
  var columns = "*";
  var condition = ``;
  const user = await ajax(
    "/fetchValues",
    { tableName, columns, condition },
    "post"
  );
  console.log("user", user);
  if (user !== []) return user;
  else {
    return 0;
  }
}
