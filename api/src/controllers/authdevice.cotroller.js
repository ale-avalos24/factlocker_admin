import AuthDevice from '../models/AuthDevice';

export const createAuthDevice = async (req, res) => {
  try {
    const newAuthDevice = new AuthDevice({
        hostname: req.body.hostname,
        rpi_serial: req.body.rpi_serial,
        description: req.body.description,
        access_list: req.body.access_list,
    });

    const AuthDeviceSaved = await newAuthDevice.save();

    return res.json(AuthDeviceSaved)
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo crear el dispositivo",
    });
  }
};

export const findAllAuthDevices = async (req, res) => {
  try {
    const AuthDevices = await AuthDevice.find({});

    return res.json(AuthDevices);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pueden devolver los dispositivos",
    });
  }
};

export const findOneAuthDevice = async (req, res) => {
  const { hostname } = req.params;
  try {
    const AuthDevice = await AuthDevice.findOne({ hostname: hostname });
    if(!AuthDevice){
      return res
       .status(404)
       .json({message: `El dispositivo ${hostname} no existe.`});
    }
    return res.json(AuthDevice);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo encontrar el dispositivo",
    });
  }
}

export const updateAuthDevice = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Se debe modificar al menos un campo",
    });
  }

  const { hostname } = req.params;

  try {
    const updateAuthDevice = await AuthDevice.findOneAndUpdate({hostname: hostname}, req.body, {
      new: true,
    });

    if (!updateAuthDevice) {
      return res.status(404).json({
        message: `No se puede editar el dispositivo ${hostname}. Probablemente no exista.`
      })
    }

    return res.json(updateAuthDevice);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el dispositivo.",
    });
  }
}

export const deleteAuthDevice = async (req, res) => {
  const { hostname } = req.params;

  try {
    const deletedAuthDevice = await AuthDevice.findOneAndDelete({hostname: hostname});

    if (!deletedAuthDevice) {
      return res.status(404).json({
        message: `No se puede eliminar el dispositivo ${id}. Probablemente no exista.`
      })
    }

    return res.json(deletedAuthDevice);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el usuario",
    });
  }
}