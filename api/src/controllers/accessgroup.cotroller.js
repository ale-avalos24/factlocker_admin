import AccessGroup from '../models/AcessGroup';

export const createAccessGroup = async (req, res) => {
  try {
    const newAccessGroup = new AccessGroup({
        group_name: req.body.group_name,
        user_allowed: req.body.user_allowed
    });

    const AccessGroupSaved = await newAccessGroup.save();

    return res.json(AccessGroupSaved)
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo crear el grupo",
    });
  }
};

export const findAllAccessGroups = async (req, res) => {
  try {
    const AccessGroups = await AccessGroup.find({});

    return res.json(AccessGroups);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pueden devolver los grupos",
    });
  }
};

export const findOneAccessGroup = async (req, res) => {
  const { group_name } = req.params;
  try {
    const AccessGroup = await AccessGroup.findOne({ group_name: group_name });
    if(!AccessGroup){
      return res
       .status(404)
       .json({message: `El grupo ${group_name} no existe.`});
    }
    return res.json(AccessGroup);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo encontrar el grupo",
    });
  }
}

export const updateAccessGroup = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Se debe modificar al menos un campo",
    });
  }

  const { group_name } = req.params;

  try {
    const updateAccessGroup = await AccessGroup.findOneAndUpdate({group_name: group_name}, req.body, {
      new: true,
    });

    if (!updateAccessGroup) {
      return res.status(404).json({
        message: `No se puede editar el grupo ${group_name}. Probablemente no exista.`
      })
    }

    return res.json(updateAccessGroup);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el grupo.",
    });
  }
}

export const deleteAccessGroup = async (req, res) => {
  const { group_name } = req.params;

  try {
    const deletedAccessGroup = await AccessGroup.findOneAndDelete({group_name: group_name});

    if (!deletedAccessGroup) {
      return res.status(404).json({
        message: `No se puede eliminar el grupo ${group_name}. Probablemente no exista.`
      })
    }

    return res.json(deletedAccessGroup);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error detectado. No se pudo actualizar el usuario",
    });
  }
}