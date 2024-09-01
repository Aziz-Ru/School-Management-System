import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();
const pass = { role: "admin", id: "cuti00183883", uid: "kflsfierj9920" };
const secure = jwt.sign(pass, process.env.JWT_SECRET_KEY);
console.log(secure);

const verifing = jwt.verify(secure, process.env.JWT_SECRET_KEY);

console.log(verifing);
