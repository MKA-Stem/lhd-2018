import Datetime from './Datetime.js';
import db from './db.js';

const resolvers = {
  Query: {
    async viewer(root, args, ctx) {
      const message = await db('messages')
        .where({userId: ctx.user.id})
        .first('user_id as id', 'message');
      return message || {id: ctx.user.id, message: 'empty'};
    }
  },

  Mutation: {
    async setMessage(root, args, ctx) {
      const record = await db.raw(
        `
        insert into messages as original ( user_id, message )
        values ( :id, :message )
        on conflict ( user_id ) do update
        set message = excluded.message
        returning user_id as id, message;
      `,
        {id: ctx.user.id, message: args.message}
      );
      console.log(record.rows[0]);
      return record.rows[0];
    }
  },

  Datetime
};

export default resolvers;
