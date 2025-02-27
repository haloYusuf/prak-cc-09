import {Sequelize} from "sequelize";

const db = new Sequelize('notes-yusuf', 'root', '', {
    host: '',
    dialect: 'mysql'
})

export default db;