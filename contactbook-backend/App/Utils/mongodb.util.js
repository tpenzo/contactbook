import { MongoClient } from 'mongodb';

class Mongodb {
   static connnect = async (uri) => {
      if (this.client) return this.client;
      this.client = await MongoClient.connect(uri);
      return this.client;
   };
}

export default Mongodb;
