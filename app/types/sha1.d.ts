/// <reference types="node" />

export default function main(message: string | Buffer, options?: Sha1Options): string | Uint8Array;


interface Sha1Options {
    asBytes?: boolean;
    asString?: boolean;
}