import User from "../models/user.mjs";

export const getOneUser = async ({ id, name, email }) => {
  console.log(id, name, email);

  return await User.findOne({ email: email });
};

export const addUser = async (newUser) => {
  const addedUser = await User.create(newUser);
  console.log(addedUser);
  return "User added successfully";
};
