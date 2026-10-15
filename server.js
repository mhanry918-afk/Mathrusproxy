
const http = require("http");

const PORT = process.env.PORT || 3000;

let config = {
  hsAltoNeck: false,
  bypass: false,
  trocaArmaRapida: false,
  telaParada: false,
  noDelay: false,
  impulsoXupetinha: false,
  danoFakeCar: false
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/api/config" && req.method === "GET") {
    res.writeHead(200);
    return res.end(JSON.stringify(config));
  }

  if (req.url === "/api/config" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10000) req.destroy();
    });

    req.on("end", () => {
      try {
        const received = JSON.parse(body);

        for (const key of Object.keys(config)) {
          if (typeof received[key] === "boolean") {
            config[key] = received[key];
          }
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          ok: true,
          config
        }));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ ok: false, error: "JSON inválido" }));
      }
    });

    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    nome: "LUCAS MODS VIP",
    status: "online",
    endpoint: "/api/config"
  }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`LUCAS MODS VIP ativo na porta ${PORT}`);
});
