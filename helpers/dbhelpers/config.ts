import dotenv from "dotenv"

dotenv.config();

//envlerin boş geldiği anın kontrol edilmesi gerekiyor
function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Environment variable '${name}' is missing in .env file.`);
    }
    return value;
  }

interface DbConfig {
    development: {
        database: string;
        username: string;
        password: string;
        host: string;
        dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite' | 'oracle';
    };
}

const config: DbConfig = {
    development: {
        database: getEnvVariable("DB_DATABASENAME,"),
        username: getEnvVariable("DB_USERNAME"),
        password: getEnvVariable("DB_PASSWORD"),
        host: getEnvVariable("DB_HOST"),
        dialect: "postgres",
    },
};

export default config;