import express from 'express'
import { createOrUpdateUser, getUser, updateProfile } from './userController';
const router = express.Router();

router.get("/api/user/:id", getUser)
router.post("/api/user", createOrUpdateUser);
router.put("/api/user", updateProfile);

export default router