import sequelize from "@/configs/sequelize";
import { CreationOptional, DataTypes, InferAttributes, Model } from "sequelize";

class User extends Model<InferAttributes<User>>{
    declare user_id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare login_token: CreationOptional<string>;
}

User.init({
    user_id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.BIGINT
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    login_token: {
        type: DataTypes.STRING
    }
}, {
    defaultScope: {
        attributes: { exclude: ["password"] },
    },
    scopes: {
        withPassword: {
            attributes: { include: ["password"] },
        },
    },
    timestamps: false,
    sequelize
})

User

export default User;