import AuthReq from '../models/AuthReq';

export const createAuthReq = async (req, res) => {
  try {
    const newAuthReq = new AuthReq({
        auth_device: req.body.auth_device,
        user_detected: req.body.user_detected,
        auth_status: req.body.auth_status,
    });

    const AuthReqSaved = await newAuthReq.save();

    return res.json(AuthReqSaved)
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo crear el usuario",
    });
  }
};

export const findAllAuthReqs = async (req, res) => {
  try {
    const AuthReqs = await AuthReq.find({});

    return res.json(AuthReqs);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pueden devolver los usuarios",
    });
  }
};

export const findOneAuthReq = async (req, res) => {
  const { id } = req.params;
  try {
    const AuthReq = await AuthReq.findOne({ _id: id });
    if(!AuthReq){
      return res
       .status(404)
       .json({message: `The ID of the request: ${id} doesn't exist `});
    }
    return res.json(AuthReq);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo encontrar el usuario",
    });
  }
}

export const updateAuthReq = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Se debe modificar al menos un campo",
    });
  }

  const { id } = req.params;

  try {
    const updateAuthReq = await AuthReq.findOneAndUpdate({_id: id}, req.body, {
      new: true,
    });

    if (!updateAuthReq) {
      return res.status(404).json({
        message: `No se puede editar el usuario ${id}. Probablemente no exista.`
      })
    }

    return res.json(updateAuthReq);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el usuario",
    });
  }
}

export const deleteAuthReq = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAuthReq = await AuthReq.findOneAndDelete({_id: id});

    if (!deletedAuthReq) {
      return res.status(404).json({
        message: `No se puede eliminar el usuario ${id}. Probablemente no exista.`
      })
    }

    return res.json(deletedAuthReq);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el usuario",
    });
  }
}