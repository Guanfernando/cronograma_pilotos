import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Pilot = sequelize.define('pilots', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true, 
        field: 'id'
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'idtype'
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'firstname'
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'secondname'
    },
    firstLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'firstlastname'
    },
    secondLastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'secondlastname'
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'birthday'
    },
    telephoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'telephonenumber'
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'city'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'address'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        field: 'email'
    },
    rh: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'rh'
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'weight'
    },
    eps: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'eps'
    },
    role: {
        type: DataTypes.STRING(25),
        allowNull: false,
        field: 'role'
    },
    emergencyContact: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'emergencycontact'
    },
    emergencyNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'emergencynumber'
    },
    licenseType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'licensetype'
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'licensenumber'
    },
    medicalCertificate: {
        type: DataTypes.DATEONLY,
        field: 'medicalcertificate'
    },
    certificateExpiration: {
        type: DataTypes.DATEONLY,
        field: 'certificateexpiration'
    }
}, {
    timestamps: false,
    tableName: 'pilots'
});

export default Pilot;
