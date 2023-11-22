import { createPool } from "mysql2/promise";

export const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "registration",
  connectionLimit: 10
})