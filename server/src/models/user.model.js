import {DataTypes, QueryTypes} from "@sequelize/core";
import sequelize from "../sequelize.js";
import Order from "./order.model.js";

const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING
        },
    }
);

User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});

User.getAll = () =>
    sequelize.query(`SELECT *
                     FROM "user"`, {type: QueryTypes.SELECT})

User.getAllInBetween = (count, offset) =>
    sequelize.query(`SELECT *
                     FROM "user"
                     LIMIT :count OFFSET :offset`,
        {
            type: QueryTypes.SELECT,
            replacements: {
                count: count,
                offset: offset
            }
        })

User.getByID = (id) =>
    sequelize.query(`SELECT *
                     FROM "user"
                     WHERE id = ?`,
        {type: QueryTypes.SELECT, replacements: [id]})

User.create = ({firstname, surname, email}) =>
    sequelize.query(`INSERT INTO "user" (firstname, surname, email)
                     VALUES (:firstname, :surname, :email)`,
        {
            type: QueryTypes.INSERT,
            replacements: {
                firstname: firstname,
                surname: surname,
                email: email
            }
        })

User.updateByID = ({id, firstname, surname, email}) =>
    sequelize.query(`UPDATE "user"
                     SET firstname = :firstname,
                         surname   = :surname,
                         email     = :email
                     WHERE id = :id`,
        {
            type: QueryTypes.UPDATE,
            replacements: {
                id: id,
                firstname: firstname,
                surname: surname, email:
                email
            }
        })

User.deleteByID = (id) =>
    sequelize.query(`DELETE
                     FROM "user"
                     WHERE id = ?`,
        {type: QueryTypes.DELETE, replacements: [id]})

export default User;