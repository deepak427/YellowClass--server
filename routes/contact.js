import express from "express";

import { addContact, deleteContact, editContact } from "../controllers/contact.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch('/add/:id',auth, addContact)
router.patch('/delete/:id', deleteContact)
router.patch('/edit/:id',auth, editContact)

export default router