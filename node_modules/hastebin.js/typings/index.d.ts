interface ClientOptions {
        url?: string;
    }
    
declare class Hastebin {
        constructor(clientOptions?: ClientOptions)
        post(code: string): Promise<string>;
        get(key: string): Promise<string>;
    }

export = Hastebin
// Type definitions for hastebin.js
// Definitions by Charalampos Fanoulis <charalampos.fanoulis@gmail.com>