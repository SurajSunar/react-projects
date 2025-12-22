import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import fs from "fs";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.resolve("db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const SECRET_KEY = "supersecret";
const EXPIRES_IN = "1h";

const readDB = () =>
  JSON.parse(fs.readFileSync(path.resolve("db.json"), "utf-8"));

const writeDB = (data) =>
  fs.writeFileSync(path.resolve("db.json"), JSON.stringify(data, null, 2));

const createToken = (payload) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

/* ======================
   SIGNUP
====================== */
server.post("/signup", (req, res) => {
  const { email, password, role = "user" } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const db = readDB();
  const exists = db.users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: "User already exists" });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword,
    role,
  };

  db.users.push(newUser);
  writeDB(db);

  const token = createToken({
    id: newUser.id,
    email,
    role,
  });

  res.status(201).json({
    accessToken: token,
    user: { id: newUser.id, email, role },
  });
});

/* ======================
   LOGIN
====================== */
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find((u) => u.email === email);
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = createToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.json({
    accessToken: token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

/* ======================
   JWT MIDDLEWARE
====================== */
server.use((req, res, next) => {
  if (["/login", "/signup"].includes(req.path)) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
});

/* ======================
   PROTECTED ROUTES
====================== */
server.use(router);

server.listen(3000, () => {
  console.log("✅ Mock API running at http://localhost:3000");
});
