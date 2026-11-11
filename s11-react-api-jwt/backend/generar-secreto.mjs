import { randomBytes } from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

if (!process.env.JWT_SECRET) {
  throw new Error("Falta JWT_SECRET. Ejecuta: node generar-secreto.mjs");
}


if (existsSync(".env")) {
  console.log("Ya existe .env; se conserva su clave actual.");
} else {
  const secreto = randomBytes(32).toString("hex");
  writeFileSync(".env", `JWT_SECRET=${secreto}\n`, { mode: 0o600 });
  console.log("Archivo .env creado con una clave aleatoria.");
}

