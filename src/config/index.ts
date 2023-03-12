import { ConfigModuleOptions } from "@nestjs/config/dist";
import { appConfig } from "./app";
import { DatabaseConfig } from "./database";

export const config:ConfigModuleOptions = {
    load: [appConfig, DatabaseConfig],
    cache: true,
    isGlobal: true
}
