import { Router } from "express";

import {
    createAuthReq,
    findAllAuthReqs,
    findOneAuthReq,
    updateAuthReq,
    deleteAuthReq
} from '../controllers/authreq.cotroller';

const router = Router();

router.post("/", createAuthReq);
router.get("/", findAllAuthReqs);
router.get("/:id", findOneAuthReq);
router.put("/:id", updateAuthReq);
router.delete("/:id", deleteAuthReq);

export default router;