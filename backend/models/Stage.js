import {DataTypes} from 'sequelize';
import {sequelize} from '../db.js';

const Stage = sequelize.define('stages',{
    stageId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
        field: 'stageid'
    },
    stageName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'stagename'
    }
}, {
    timestamps: false,

});

export default Stage;