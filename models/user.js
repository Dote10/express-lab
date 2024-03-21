const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            email:{
                type: Sequelize.STRING(225),
                allowNull:false,
                unique: true,
            },
            password : {
                type: Sequelize.STRING(225),
                allowNull : false,
            },
            age:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married:{
                type: Sequelize.BOOLEAN,
                allowNull:false,
            },
            aboutMe : {
                type : Sequelize.TEXT,
                allowNull:true,
            },
            created_at:{
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue: Sequelize.NOW
            }
            },{
                sequelize,
                timestamps:false,   //createdAt, updatedAt
                underscored:false,  //ture- snake case, false - camel
                modelName:'User',
                tableName:'users',
                paranoid: false,
                charset:'utf8',     //deletedAt softdelete
                collate:'utf8_general_ci'            
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id'});
    }
};