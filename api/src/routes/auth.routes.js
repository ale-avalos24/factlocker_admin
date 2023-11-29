import { Router } from "express";

import {
    makePreauth,
    makeAuthPush,
    makeAuthCode
} from '../controllers/auth.controller';

const router = Router();

router.post("/preauth",  makePreauth);
router.post("/push",  makeAuthPush);
router.post("/code",  makeAuthCode);

export default router;