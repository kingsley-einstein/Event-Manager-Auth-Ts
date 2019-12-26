import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

export default (sequelize: any, DataTypes: any) => {
  const Auth = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Enter a valid email."
        },
        notEmpty: {
          msg: "Email is required."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required."
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (model: any) => {
        const id = uuid();
        model.id = id;
      },
      beforeSave: (model: any) => {
        if (model.changed("password")) {
          const salt = bcrypt.genSaltSync(12);
          model.password = bcrypt.hashSync(model.password, salt);
        }
      }
    }
  });

  Auth.findByEmail = (email: string) => Auth.findOne({ where: { email } });
  return Auth;
};
