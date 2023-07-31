import dotenv from "dotenv";

dotenv.config();

//envlerin boş geldiği anın kontrol edilmesi gerekiyor, trim ile .env ismindeki oluşabilecek boşluklardan kurtulmakta fayda var.
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value || typeof value !== "string") {
    throw new Error(`Environment variable '${name}' is missing in .env file.`);
  }
  return value.trim();
}

interface DbConfig {
  development: {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect: "mysql" | "mariadb" | "postgres" | "mssql" | "sqlite" | "oracle";
  };
}

const config: DbConfig = {
  development: {
    database: getEnvVariable("DB_DATABASENAME"),
    username: getEnvVariable("DB_USERNAME"),
    password: getEnvVariable("DB_PASSWORD"),
    host: getEnvVariable("DB_HOST"),
    port: parseInt(getEnvVariable("DB_PORT")),
    dialect: "postgres",
  },
};

export default config;
