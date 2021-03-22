import ajax from "./base";

const baseURL = "";


export async function getAddress(id) {
    var tableName = "Address";
    var condition = `AddressID = '${id}'`
    const address = await ajax(
      "/fetchValues",
      { tableName, condition},
      "post"
    );
    console.log("address", address);
    if (address !== []) return address;
    else {
      return 0;
    }
  }
  export async function getQuotes(id) {
    var tableName = "quotes";
    var condition = `AddressID = '${id}'`
    const quotelist = await ajax(
      "/fetchValues",
      { tableName, condition},
      "post"
    );
    console.log("quotes ", quotelist);
    if (quotelist !== []) return quotelist;
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