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
            validate: {
                // notNull: true
                len: [1, 140]
            }
        },
        complete: DataTypes.BOOLEAN
    });

    return Todo;
}