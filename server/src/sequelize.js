import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize, importModels } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASS,
    user: process.env.DATABASE_USER,
    host: process.env.HOST,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    models: await importModels(__dirname + '/**/*.model.{ts,js}'),
});

export default sequelize;
