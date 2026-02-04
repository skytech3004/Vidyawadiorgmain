import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "vidyawadiMain",
    password: process.env.MYSQL_PASSWORD || "8471@i10A",
    database: process.env.MYSQL_DATABASE || "vidyawadi_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
