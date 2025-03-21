import {Sequelize} from "sequelize";

const db = new Sequelize('notes-yusuf', 'yusuf', '12345678', {
    host: '34.135.33.30',
    dialect: 'mysql',
    timezone: '+07:00'
})

export default db;