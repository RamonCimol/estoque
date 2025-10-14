// src/testarToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4ZW1wbG8uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwNDY5NjI1LCJleHAiOjE3NjA0NzMyMjV9.Vf0Iy6BX1XhVh_cCBZqTlH-3uldJ1N6GNCRu29C7sh4"; // 🔹 Substitua pelo token retornado no login
const secret = process.env.SECRET_KEY; // 🔹 Deve ser igual à sua SECRET_KEY do .env

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token VÁLIDO!");
  console.log("Dados decodificados:", decoded);
} catch (err) {
  console.error("❌ Token INVÁLIDO ou EXPIRADO!");
  console.error("Motivo:", err.message);
}
