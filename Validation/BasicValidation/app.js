const validateUser = require("./basicValidation");

const user = {
    name:"Praveen",
    age:26,
};

const result = validateUser(user);
console.log(result);