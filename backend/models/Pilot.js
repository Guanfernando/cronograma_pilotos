//backend/models.pilot.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Pilot = sequelize.define('Pilot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    secondName: DataTypes. STRING,

}, {
    timestamps: false

});

export default Pilot;


