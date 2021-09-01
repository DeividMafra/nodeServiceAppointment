export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default', // the value 'default' is here just for automated tests purpose
    expiresIn: '1d',
  },
};
