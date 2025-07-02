import validator from "validator";

export const validateUser = (username, email, password) => {
  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  if (!username) {
    throw new Error("Username is required!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is inValid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must br strong");
  }
};
