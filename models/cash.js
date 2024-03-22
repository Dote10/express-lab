const Sequelize = require('sequelize')

module.exports = class Cash extends Sequelize.Model{
    static init(sequelize){
        super.init({
            balance:{
                type: Sequelize.INTEGER(11),
                allowNull:false,
                defaultValue: 0
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
        },{
            sequelize,
            timestamps:false,
            modelName:'Cash',
            tableName:'cash',
            paranoid: false,
            charset:'utf8m',
            collate:'utf8m_general_ci'
        })
    }

    static associate(db) {
        db.Comment.belongsTo(db.User,{foreignKey:'user',targetKey:'id', onDelete:'cascade', onUpdate:'cascade'})
    }
}