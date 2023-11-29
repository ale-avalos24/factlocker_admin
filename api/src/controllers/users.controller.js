import User from "../models/User";

export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone_num: req.body.phone_num,
      rfid_code: null,
      role_user: 'user',
      auth_counter: 0
    });

    const userSaved = await newUser.save();

    return res.json(userSaved)
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo crear el usuario",
    });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pueden devolver los usuarios",
    });
  }
};

export const findOneUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    if(!user){
      return res
       .status(404)
       .json({message: `The username ${username} doesn't exist`});
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo encontrar el usuario",
    });
  }
}

export const updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Se debe modificar al menos un campo",
    });
  }

  const { username } = req.params;

  try {
    const updateUser = await User.findOneAndUpdate({username: username}, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({
        message: `No se puede editar el usuario ${username}. Probablemente no exista.`
      })
    }

    return res.json(updateUser);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el usuario",
    });
  }
}

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({username: username});

    if (!deletedUser) {
      return res.status(404).json({
        message: `No se puede eliminar el usuario ${username}. Probablemente no exista.`
      })
    }

    return res.json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el usuario",
    });
  }
}

export const findUserByRFID = async (req, res) => {
  const { rfid_code } = req.params;
  try {
    const user = await User.findOne({ rfid_code: rfid_code });

    if(!user){
      return res
       .status(404)
       .json({message: `El codigo RFID ${rfid_code} no existe.`});
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}