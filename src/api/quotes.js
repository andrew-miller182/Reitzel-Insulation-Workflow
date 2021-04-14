import ajax from "./base";

const baseURL = "";

export async function sendQuote(customer, email){
    var to = customer;
    var subject = "Your quote with Rietzel Insulation";
    var html = email;

    var completed = await ajax("/sendEmailHtml", {to, subject, html}, "post");
    if (completed !== []) return completed;
    else return 0;
 }