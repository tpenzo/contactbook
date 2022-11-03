const config = {
   PORT: process.env.PORT || 4000,
   db: {
      uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/contactbook',
   },
};

export default config;
