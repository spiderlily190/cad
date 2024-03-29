export enum Cookie {
  Session = "snaily-cad-session",
}

export const API_TOKEN_HEADER = "snaily-cad-api-token" as const;
export type AllowedFileExtension = typeof allowedFileExtensions[number];
export const allowedFileExtensions = ["image/png", "image/gif", "image/jpeg", "image/jpg"] as const;
export const IMGUR_REGEX = /https:\/\/i.imgur.com\/[A-Za-z0-9]\w+.(jpeg|png|gif|jpg)/g;

export * from "./socket-events";
export * from "./routes";
