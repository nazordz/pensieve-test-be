import sequelize from "@/configs/sequelize";
import { DataTypes, InferAttributes, Model } from "sequelize";

class Gps extends Model<InferAttributes<Gps>> {
    declare id: string;
    declare device_id: string;
    declare device_type: string;
    declare timestamp: string;
    declare location: string;
}

Gps.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.BIGINT
    },
    device_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    device_type: {
        allowNull: false,
        type: DataTypes.STRING
    },
    timestamp: {
        allowNull: false,
        type: DataTypes.STRING
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    sequelize,
})

export default Gps;