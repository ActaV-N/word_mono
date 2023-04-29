import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-naver';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, "naver"){
    constructor(){
        super({
            clientID:process.env.OAUTH_NAVER_ID,
            clientSecret:process.env.OAUTH_NAVER_SECRET,
            callbackURL:process.env.OAUTH_NAVER_URL
        })
    }

    validate(
        accessToken: string,
        refreshToken: string,
        profile: any
    ){
        const {id} = profile;
        const {email, nickname} = profile._json;

        console.log(profile)
        return {
            provider: 'naver',
            providerId: id,
            name: nickname,
            email: email
        }
    }
}