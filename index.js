require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

// Sirve archivos estáticos desde carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ Ruta raíz con JSON requerido por EvolutionAPI Cloud
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "¡Si! funciona!",
    version: "1.8.7",
    author: "Roberto Rabilero"
  });
});

// Ruta /manager que muestra el panel HTML
app.get("/manager", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta /status que devuelve confirmación de estado
app.get("/status", (req, res) => {
  res.json({
    status: "✅ Activa",
    fecha: new Date().toLocaleString()
  });
});

// Ruta /evolucion que responde con texto plano
app.get("/evolucion", (req, res) => {
  res.send("Esta es la ruta /evolucion funcionando correctamente.");
});

// Ruta /webhook que recibe peticiones POST desde n8n
app.post("/webhook", express.json(), (req, res) => {
  console.log("📩 Recibido desde n8n:", req.body);
  res.status(200).json({ recibido: true });
});

// Puerto y servidor activo
const PORT = process.env.PORT || 8081;
app.listen(PORT,  '0.0.0.0', () => {
  console.log(`🌐 Servidor ouvindo na porta  ${PORT}`);
});

