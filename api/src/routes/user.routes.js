import { Router } from "express";

import {
    createUser,
    findAllUsers,
    findOneUser,
    updateUser,
    deleteUser,
    findUserByRFID
} from '../controllers/users.controller';

const router = Router();

router.post("/", createUser);
router.get("/", findAllUsers);
router.get("/:username", findOneUser);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);
router.get("/rfid/:rfid_code", findUserByRFID);

export default router;