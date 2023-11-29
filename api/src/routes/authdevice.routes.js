import { Router } from "express";

import {
    createAuthDevice,
    findAllAuthDevices,
    findOneAuthDevice,
    updateAuthDevice,
    deleteAuthDevice
} from '../controllers/authdevice.cotroller';

const router = Router();

router.post("/", createAuthDevice);
router.get("/", findAllAuthDevices);
router.get("/:hostname", findOneAuthDevice);
router.put("/:hostname", updateAuthDevice);
router.delete("/:hostname", deleteAuthDevice);

export default router;