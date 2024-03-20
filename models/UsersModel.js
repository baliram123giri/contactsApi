const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const { hashSync } = require("bcrypt");


const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: DataTypes.STRING,
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            return this.setDataValue('password', hashSync(value, 10))
        }
    },
    UserTypeId: DataTypes.INTEGER,
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    first_time_login: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    profile_avatar: DataTypes.STRING
})

// User.sync({ alter: true })


module.exports = User