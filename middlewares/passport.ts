import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { createJwtToken } from 'utils/createJwtToken';
import { generateMD5 } from 'utils/generateHash';
//import db from 'db/models';
const { Op } = require('sequelize');
const db = require('db/models');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.User.findOne({
        where: { [Op.or]: [{ email: username }, { username }] },
      });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
        const { id, email, username, confirmed } = user;
        return done(null, { id, email, username, confirmed, token: createJwtToken(user) });
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      done(err, false);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY || 'qwerty',
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload, done) => {
      try {
        const user = await db.User.findByPk(payload.data.id);
        if (user) {
          const { id, email, username, confirmed } = user;
          return done(null, { id, email, username, confirmed });
        }
        done(null, false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await db.User.findByPk(id);
  done(null, user);
});

export default passport;
