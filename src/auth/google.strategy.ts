import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

  constructor()
  {
    super({
      clientID    : '3219541381-q8mqepir30nfbt0erle047mkq796ms4r.apps.googleusercontent.com',     // <- Replace this with your client id
      clientSecret: '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', // <- Replace this with your client secret
      callbackURL : 'http://localhost:3000/auth/callback',
      passReqToCallback: true,
      scope: ['email']
    })
  }


  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
  {
    try
    {
      console.log(profile);

      const jwt: string = 'placeholderJWT'
      const user =
        {
          jwt
        }

      done(null, user);
    }
    catch(err)
    {
      // console.log(err)
      done(err, false);
    }
  }

}
