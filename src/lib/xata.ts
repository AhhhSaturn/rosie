// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from '@xata.io/client';
import type {
    BaseClientOptions,
    SchemaInference,
    XataRecord,
} from '@xata.io/client';

const tables = [
    {
        name: 'whitelist',
        checkConstraints: {
            whitelist_xata_id_length_xata_id: {
                name: 'whitelist_xata_id_length_xata_id',
                columns: ['xata_id'],
                definition: 'CHECK ((length(xata_id) < 256))',
            },
        },
        foreignKeys: {},
        primaryKey: [],
        uniqueConstraints: {
            _pgroll_new_whitelist_xata_id_key: {
                name: '_pgroll_new_whitelist_xata_id_key',
                columns: ['xata_id'],
            },
            whitelist__pgroll_new_discord_id_key: {
                name: 'whitelist__pgroll_new_discord_id_key',
                columns: ['discord_id'],
            },
            whitelist__pgroll_new_floodgate_id_key: {
                name: 'whitelist__pgroll_new_floodgate_id_key',
                columns: ['floodgate_id'],
            },
            whitelist__pgroll_new_minecraft_user_key: {
                name: 'whitelist__pgroll_new_minecraft_user_key',
                columns: ['minecraft_user'],
            },
        },
        columns: [
            {
                name: 'discord_id',
                type: 'text',
                notNull: true,
                unique: true,
                defaultValue: null,
                comment: '',
            },
            {
                name: 'discord_user',
                type: 'text',
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: '',
            },
            {
                name: 'floodgate_id',
                type: 'text',
                notNull: false,
                unique: true,
                defaultValue: null,
                comment: '',
            },
            {
                name: 'minecraft_platform',
                type: 'text',
                notNull: true,
                unique: false,
                defaultValue: null,
                comment: '',
            },
            {
                name: 'minecraft_user',
                type: 'text',
                notNull: true,
                unique: true,
                defaultValue: null,
                comment: '',
            },
            {
                name: 'xata_createdat',
                type: 'datetime',
                notNull: true,
                unique: false,
                defaultValue: 'now()',
                comment: '',
            },
            {
                name: 'xata_id',
                type: 'text',
                notNull: true,
                unique: true,
                defaultValue: "('rec_'::text || (xata_private.xid())::text)",
                comment: '',
            },
            {
                name: 'xata_updatedat',
                type: 'datetime',
                notNull: true,
                unique: false,
                defaultValue: 'now()',
                comment: '',
            },
            {
                name: 'xata_version',
                type: 'int',
                notNull: true,
                unique: false,
                defaultValue: '0',
                comment: '',
            },
        ],
    },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Whitelist = InferredTypes['whitelist'];
export type WhitelistRecord = Whitelist & XataRecord;

export type DatabaseSchema = {
    whitelist: WhitelistRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
    databaseURL:
        'https://Ahhh_Saturn-s-workspace-tncb11.eu-west-1.xata.sh/db/rosiesmp',
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
    constructor(options?: BaseClientOptions) {
        super({ ...defaultOptions, ...options }, tables);
    }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
    if (instance) return instance;

    instance = new XataClient();
    return instance;
};
