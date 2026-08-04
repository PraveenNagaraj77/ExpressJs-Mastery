const validateUser = (user) => {
  const { name, age } = user;

  if (!name) {
    return {
      valid: false,
      message: "Name is required",
    };
  }

  if (typeof name !== "string") {
    return {
      valid: false,
      message: "Name must be a string",
    };
  }

  if (typeof age !== "number") {
    return {
      valid: false,
      message: "Age must be a number",
    };
  }

  if (age < 18) {
    return {
      valid: false,
      message: "Age must be at least 18",
    };
  }

  return {
    valid: true,
    message: "Validation successful",
  };
};

module.exports = validateUser;