import { Router } from "express";

import {
    createAccessGroup,
    findAllAccessGroups,
    findOneAccessGroup,
    updateAccessGroup,
    deleteAccessGroup
} from '../controllers/accessgroup.cotroller';

const router = Router();

router.post("/", createAccessGroup);
router.get("/", findAllAccessGroups);
router.get("/:group_name", findOneAccessGroup);
router.put("/:group_name", updateAccessGroup);
router.delete("/:group_name", deleteAccessGroup);

export default router;