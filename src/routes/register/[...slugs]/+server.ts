import { XataClient } from '$lib/xata';
import { type Cookie, Elysia } from 'elysia';
const xata = new XataClient({
    apiKey: Bun.env.XATA_API_KEY,
    branch: Bun.env.XATA_BRANCH,
});

const add = (platform: string, user: string, username: Cookie<string | undefined>, id: Cookie<string | undefined>) => {
    if (platform === 'bedrock') {
        fetch(`https://mcprofile.io/api/v1/bedrock/gamertag/${user}`, {
            headers,
        })
            .then((res) => res.json())
            .then((account: bedrockLookup) => {
                xata.db.whitelist.create({
                    xata_id: Bun.randomUUIDv7(),
                    discord_id: id.value,
                    minecraft_platform: platform,
                    minecraft_user: user,
                    floodgate_id: account.floodgateuid,
                    discord_user: username.value,
                });
            });
    } else if (platform === 'java') {
        xata.db.whitelist.create({
            xata_id: Bun.randomUUIDv7(),
            discord_id: id.value,
            minecraft_platform: platform,
            minecraft_user: user,
            discord_user: username.value
        });
    }
};


if (!Bun.env.MC_LOOKUP_KEY) throw new Error('Add MC_LOOKUP_KEY to env file');
const headers = new Headers();
headers.append('x-api-key', Bun.env.MC_LOOKUP_KEY);

const app = new Elysia({
    prefix: '/register',
}).get(
    '/write/:user/:platform',
    async ({ params: { platform, user }, redirect, cookie: { username, id } }) => {
        const record = await xata.db.whitelist
            .select([
                "discord_id",
            ]).filter({ discord_id: id.value })
            .getFirst();
        if (record !== null) return redirect('/registered/failed?reason=alreadyReg', 302);
        add(platform, user, username, id);
        return redirect('/registered/success');
    },
);

type RequestHandler = (v: { request: Request; }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
