const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        super.init({
            title:{
                type:Sequelize.STRING(225),
                allowNull:false
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps:false,
            modelName:'Hashtag',
            tableName:'hashtags',
            paranoid: false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    static associate(db){
        //db.Hashtag.hasMany(db.PostHashtag,{foreignKey:'hashtag_id',sourceKey:'id'});
        db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'});
    }
}