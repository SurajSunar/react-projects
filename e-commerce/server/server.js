import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import fs from "fs";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const SECRET_KEY = "supersecret";
const expiresIn = "1h";

// Read DB
const db = JSON.parse(fs.readFileSync("./server/db.json", "UTF-8"));

// Login route
server.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid email" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn }
  );
  res.json({
    accessToken: token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

// Auth middleware
server.use((req, res, next) => {
  console.log(db);

  if (req.path === "/login") return next();
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: db + "A No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("✅ A Mock JWT API running at http://localhost:3000");
});
