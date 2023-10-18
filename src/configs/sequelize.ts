import { Sequelize } from "sequelize";
import { getEnv } from "./config";

const sequelize = new Sequelize(getEnv('DB_NAME'), getEnv('DB_USER'), getEnv('DB_PASSWORD', ''), {
    host: getEnv('DB_HOST'),
    dialect: 'mysql',
    port: Number(getEnv('DB_PORT')),
})

export default sequelize;