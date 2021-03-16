import ajax from "./base";

const baseURL = "";


export async function getEstimates() {
    console.log("here");
    var tableName = "estimates";
    const estimatelist = await ajax(
      "/fetchValues",
      { tableName},
      "post"
    );
    console.log("estimatelist", estimatelist);
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