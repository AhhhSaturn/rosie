import { DiscordAuth, Scopes } from 'discord-auth.ts';
import type { AccessToken } from 'discord-auth.ts/src/interfaces/user/accessToken';
import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/auth' });

if (!Bun.env.DISCORD_SECRET) throw new Error('Add DISCORD_SECRET to env file');
if (!Bun.env.DISCORD_CALLBACK)
    throw new Error('Add DISCORD_CALLBACK to env file');
if (!Bun.env.DISCORD_ID) throw new Error('Add DISCORD_ID to env file');
const oauth2 = new DiscordAuth(
    Bun.env.DISCORD_ID,
    Bun.env.DISCORD_SECRET,
    Bun.env.DISCORD_CALLBACK,
    [Scopes.IDENTIFY, Scopes.GUILDS],
);

app.get('/', ({ redirect }) => {
    const oauth2Link = oauth2.getAuthUrl();
    return redirect(oauth2Link);
});

app.get(
    '/callback',
    async ({
        query: { code, error },
        set,
        redirect,
        cookie: { avatar, username, token, id },
    }) => {
        if (!code || error) {
            set.status = 'Bad Request';
            return 'Bad Request';
        }
        const accessToken = (await oauth2
            .accessHandler()
            .tokenExchange(code)) as AccessToken;
        const userData = await oauth2.user(accessToken).getUser();
        const avatarURL = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;

        token.set({
            value: accessToken,
            path: '/',
            maxAge: accessToken.expires_in,
            expires: new Date(accessToken.expires_in),
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        });

        id.set({
            value: userData.id,
            path: '/',
            maxAge: accessToken.expires_in,
            expires: new Date(accessToken.expires_in),
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        });

        avatar.set({
            value: avatarURL,
            path: '/',
            maxAge: accessToken.expires_in,
            expires: new Date(accessToken.expires_in),
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        });

        username.set({
            value: userData.username,
            path: '/',
            maxAge: accessToken.expires_in,
            expires: new Date(accessToken.expires_in),
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        });

        return redirect('/');
    },
);

app.get('/logout', ({ cookie: { token, avatar, username }, redirect }) => {
    token.set({
        maxAge: 0,
        expires: new Date(new Date().getTime() - 1),
        path: '/',
        value: null,
    });
    avatar.set({
        maxAge: 0,
        expires: new Date(new Date().getTime() - 1),
        path: '/',
        value: null,
    });
    username.set({
        maxAge: 0,
        expires: new Date(new Date().getTime() - 1),
        path: '/',
        value: null,
    });

    return redirect('/?referer=/auth/logout', 301);
});

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
