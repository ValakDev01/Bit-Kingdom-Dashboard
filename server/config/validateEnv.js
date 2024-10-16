const { cleanEnv, port } = require('envalid');

const validateEnv = () => {
  return cleanEnv(process.env, {
    PORT: port({
      default: 8000,
      desc: 'The port on which the application runs',
    }),
  });
};

module.exports = validateEnv;
