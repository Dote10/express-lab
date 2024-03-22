const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        super.init({
            user:{
                type: Sequelize.INTEGER(11),
                allowNull:false
            },
            title:{
                type:Sequelize.STRING(225),
                allowNull:false
            },
            content:{
                type:Sequelize.TEXT,
                allowNull:false
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:true,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps:false,
            modelName:'Post',
            tableName:'posts',
            paranoid: false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        });
    }
    static associate(db){
        db.Post.hasMany(db.Comment,{foreignKey:'post_id',sourceKey:'id'});
       // db.Post.hasMany(db.PostHashtag,{foreignKey:'post_id',sourceKey:'id'});
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
    }
}