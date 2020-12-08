// module.exports = function(sequelize, DataTypes) {
//     const Todo = sequelize.define("todo", {
//         text: DataTypes.STRING, 
//         complete: DataTypes.BOOLEAN
//     });

//     return Todo;
// }

module.exports = function(sequelize, DataTypes) {
    const Todo = sequelize.define("todo", {
        text: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: {
                // notNull: {msg: "Please enter somthing"},
                len: [1, 140]
            }
        },
        complete: {
            type : DataTypes.BOOLEAN,
            // defaultValue: true
        }
    });

    return Todo;
}