
import Joi = require('@hapi/joi');
export default Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
 
  age: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .required(),
 
})
