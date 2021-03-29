import ajax from "./base";

const baseURL = "";


export async function getEstimates() {
    var tableName = "estimates";
    const estimatelist = await ajax(
      "/fetchValues",
      { tableName},
      "post"
    );
    if (estimatelist !== []) return estimatelist;
    else {
      return 0;
    }
  }

export async function deleteEstimate(id) {
    var tableName = "estimates";
    var condition = `EstimateID='${id}'`;
    const result = await ajax("/deleteValues", { tableName, condition }, "post");
    console.log("result", result);
    if (result !== []) return result;
    else {
      return 0;
    }
  }

  export async function getUsers() {
    var tableName = "users";
    var condition = "SecurityLevel = 'salesman'"
    const userlist = await ajax(
      "/fetchValues",
      { tableName, condition},
      "post"
    );
    if (userlist !== []) return userlist;
    else {
      return 0;
    }
  }
  export async function updateEstimate(id, values) {
    console.log(id, values.startDate, values.endDate);
    var tableName = "estimates";
    var columnsAndValues = `startDate='${values.startDate}',endDate='${values.endDate}'`;
    var condition = `EstimateID='${id}'`;
    const result = await ajax(
      "/updateValues",
      { tableName, columnsAndValues, condition },
      "post"
    );
    console.log("result", result);
    if (result !== []) return result;
    else {
      return 0;
    }
  }