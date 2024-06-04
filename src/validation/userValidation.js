import Joi from "joi";

const userValidators = {
  // validation for signup
  signup: (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (value.length < 2) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
      lastName: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (value.length < 2) {
            return helpers.error("any.invalid");
          }
          return value;
        }),
      email: Joi.string().email().max(255).trim().lowercase().required(),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .message({
          "string.pattern.base":
            "Password must have one lowercase one uppercase one number and one special character ",
        }),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid Data", error });
    }

    next();
  },
  // validation for signin
  signin: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().max(255).trim().lowercase().required(),
      password: Joi.string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .message({
          "string.pattern.base":
            "Password must have one lowercase one uppercase one number and one special character ",
        }),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Invalid Data", error });
    }

    next();
  },
};

export default userValidators;
