import prisma from "../db/db_config.js";

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      post: {
        include: {
          comments: true, // Include comments within posts
        },
      },
      comments: true, // Include comments related directly to the user
    },
  });

  return res.json({ status: 200, data: users });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.status(400).json({
      status: 400,
      message: "Email Already Taken . please another email.",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return res.json({ status: 200, data: newUser, msg: "User created." });
};

// Update User

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!findUser) {
    return res.status(404).json({
      status: 404,
      message: "User not found.",
    });
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      name: name || findUser.name,
      email: email || findUser.email,
      password: password || findUser.password,
    },
  });

  return res.json({
    status: 200,
    data: updatedUser,
    msg: "User updated succesfully.",
  });
};

// * Show user
export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, data: user });
};

// * Delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, msg: "User deleted successfully" });
};
