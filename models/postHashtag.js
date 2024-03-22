const Sequelize = require('sequelize');

module.exports = class PostHashtag extends Sequelize.Model{
    static init(sequelize){
        super.init({
            post_id:{
                type: Sequelize.INTEGER(11),
                allowNull:false
            },
            hashtag_id:{
                type: Sequelize.INTEGER(11),
                allowNull:false
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW
            },
        },{
            sequelize,
            timestamps:false,
            modelName:'PostHashtage',
            tableName:'postHashtages',
            paranoid: false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    static associate(db){
       // db.PostHashtag.belongsTo(db.Post,{foreignKey:'post_id', targeKey:'id'});
       // db.PostHashtag.belongsTo(db.Hashtag,{foreignKey:'hashtag_id', targetKey:'id'});
    }
}