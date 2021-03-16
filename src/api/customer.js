import ajax from "./base";

const baseURL = "";


export async function getCustomers() {
    console.log("here");
    var tableName = "Customers";
    const customerlist = await ajax(
      "/fetchValues",
      { tableName},
      "post"
    );
    console.log("customerlist", customerlist);
    if (customerlist !== []) return customerlist;
    else {
      return 0;
    }
  }
  export async function getAddresses() {
    console.log("here");
    var tableName = "Addresses";
    const addresslist = await ajax(
      "/fetchValues",
      { tableName},
      "post"
    );
    console.log("addresslist", addresslist);
    if (addresslist !== []) return addresslist;
    else {
      return 0;
    }
  }

  export async function getCustomer(id){
    var tableName = "customers";
    var condition = `CustomerID = '${id}'`
    const customer = await ajax(
      "/fetchValues",
      {tableName, condition},
      "post"
    );
      if(customer !== []) return customer;
      else return 0;

    }
  export async function getCustomerAddresses(id){
    var tableName = "Addresses";
    var condition = `CustomerID = '${id}'`
    const addressList = await ajax(
      "/fetchValues",
      {tableName, condition},
      "post"
    );
    if(addressList !== []) return addressList;
    else return 0;
  }
  export async function getRegion(id){
    var tableName = "region";
    var condition = `RegionID = '${id}'`
    const region = await ajax(
      "/fetchValues",
      {tableName, condition},
      "post"
    );
    if(region !== []) return region;
    else return 0;
  }