import { rest } from "msw";

export const handlers = [
    rest.get("https://api.tzstats.com/explorer/tip", (req, res, ctx) => {
        return res(ctx.json({
            height: 24332,
            block_hash: "pqwA32saopsap"
        }))
    }),

    rest.get("https://api.tzstats.com/chains/main/blocks/head/header", (req, res, ctx) => {
        return res(ctx.json({
            height: 24332,
            block_hash: "pqwA32saopsap"
        }))
    }),

    rest.get("https://api-v2.tzstats.com/chains/main/blocks/head/header", (req, res, ctx) => {
        return res(ctx.json({
            level: 24345,
            hash: "oqwA32saopsap"
        }))
    }),

    rest.get("https://api-v3.tzstats.com/explorer/tip", (req, res, ctx) => {
        return res(ctx.json({
            height: 24350,
            block_hash: "wowA32saopsap"
        }))
    })
]