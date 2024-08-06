import {DataTypes, QueryTypes} from "@sequelize/core";
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
    sequelize.query(`SELECT "order".id, CONCAT(u.firstname, ' ', u.surname) as user_name, date, sum, status
                     FROM "order"
                              INNER JOIN "user" u on u.id = "order".user_id
                     ORDER BY id`, {type: QueryTypes.SELECT})

Order.getByUserID = (user_id) =>
    sequelize.query(`SELECT *
                     FROM "order"
                     WHERE user_id = ?`,
        {type: QueryTypes.SELECT, replacements: [user_id]})

Order.getByID = (id) =>
    sequelize.query(`SELECT *
                     FROM "order"
                     WHERE id = ?`,
        {type: QueryTypes.SELECT, replacements: [id]})

Order.updateByID = ({id, date, sum, status}) =>
    sequelize.query(`UPDATE "order"
                     SET date   = :date,
                         sum    = :sum,
                         status = :status
                     WHERE id = :id`,
        {
            type: QueryTypes.UPDATE,
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
        {type: QueryTypes.DELETE, replacements: [id]})

export default Order;