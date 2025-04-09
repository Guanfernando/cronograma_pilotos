import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Airplane = sequelize.define('airplanes', {
    airplaneId: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'airplaneid'
    },
    airplaneType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airplanetype'
    },
    airplaneModel: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airplanemodel'
    },


}, {
    timestamps: false,
    tablename: 'airplanes'

});

export default Airplane;