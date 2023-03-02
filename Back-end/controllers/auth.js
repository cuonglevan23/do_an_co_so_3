import User from '.././models/user';
import validator from 'validator';
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import randomCatAvatar from "../middleware/randomCatAvatar.js";
const newFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const register = async (req, res) => {
 
}