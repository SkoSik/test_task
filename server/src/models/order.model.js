import {DataTypes} from "@sequelize/core";
import sequelize from "../sequelize.js";

const Order = sequelize.define(
    'order',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'EXPIRED', 'COMPLETED', 'CANCELED'),
            allowNull: false,
        }
    }
);


Order.getAll = () =>
    sequelize.query(`SELECT *
                     FROM "order"`, {type: "SELECT"})

Order.getAllInBetween = (count, start) =>
    sequelize.query(`SELECT *
                     FROM "order"
                     LIMIT :count OFFSET :start`,
        {
            type: "SELECT",
            replacements: {
                count: count,
                start: start
            }
        })

Order.getByID = (id) =>
    sequelize.query(`SELECT *
                     FROM "order"
                     WHERE id = ?`,
        {type: "SELECT", replacements: [id]})

Order.create = ({user_id, date, sum, status}) =>
    sequelize.query(`INSERT INTO "order" (user_id, date, sum, status)
                     VALUES (:user_id, :date, :sum, :status)`,
        {
            type: "INSERT",
            replacements: {
                user_id: user_id,
                date: date,
                sum: sum,
                status: status
            }
        })

Order.updateByID = ({id, date, sum, status}) =>
    sequelize.query(`UPDATE "order"
                     SET date   = :date,
                         sum    = :sum,
                         status = :status
                     WHERE id = :id`,
        {
            type: "UPDATE",
            replacements: {
                id: id,
                date: date,
                sum: sum,
                status: status
            }
        })

Order.deleteByID = (id) =>
    sequelize.query(`DELETE
                     FROM "order"
                     WHERE id = ?`,
        {type: "DELETE", replacements: [id]})

export default Order;