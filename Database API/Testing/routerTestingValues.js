//Fetch Values
/*
{
    "tableName" : "Users"
}

{
    "tableName" : "Users",
    "columns" : "Email"
}

{
    "tableName" : "Users",
    "condition" : "Email='dheerajarora2246@gmail.com' AND Password='dheeraj'"
}

{
    "tableName" : "Users",
    "columns" : "SecurityLevel",
    "condition" : "Email='sampleuser@gmail.com'"
}
*/

//Insert Values
/*
{
    "tableName" : "Users",
    "values" : "null,'dheerajarora2246@gmail.com','dheeraj','Admin'"
}
*/

//Update Values
/*
{
    "tableName" : "Users",
    "columnsAndValues" : "SecurityLevel = 'Manager'",
    "condition" : "Email = 'dheerajarora2246@gmail.com'"
}

{
    "tableName" : "Users",
    "columnsAndValues" : "password='dheeraj1', SecurityLevel = 'Admin'",
    "condition" : "Email = 'dheerajarora2246@gmail.com'"
}

//It will change SecurityLevel for all the existed users to Manager
{
    "tableName" : "Users",
    "columnsAndValues" : "SecurityLevel = 'Manager'"
}
*/

//Delete Values
/*
{
    "tableName" : "Users",
    "condition" : "Email = 'dheerajarora2246@gmail.com'"
}

//This will empty the whole table
{
    "tableName" : "Users"
}
*/
