import { v4 as uuid } from "uuid";

export default (sequelize: any, DataTypes: any) => {
  const Token = sequelize.define("token", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    actual: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: (model: any) => {
        const id = uuid();
        model.id = id;
      }
    }
  });

  Token.findByActual = (actual: string) => Token.findOne({ where: { actual } });
  return Token;
};
