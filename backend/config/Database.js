import {Sequelize} from "sequelize";

const db = new Sequelize('notes-yusuf', 'root', '12345678', {
    host: '35.226.218.71',
    dialect: 'mysql',
    timezone: '+07:00'
})

export default db;