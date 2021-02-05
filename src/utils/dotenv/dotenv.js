import * as path from "path";
import fs from "fs";
import dotEnv from "dotenv";

export class DotEnv {
    static DEFAULT_PATH = '../../../env'

    static loadEnv() {
        const {NODE_ENV} = process.env;
        const envName = '.' + (NODE_ENV || 'env');
        const envPath = path.join(__dirname, this.DEFAULT_PATH, envName);
        this.load(envPath);
    }

    static loadEnvWithPath(rootPath) {
        const {NODE_ENV} = process.env;
        const envName = '.' + (NODE_ENV || 'env');
        const envPath = path.join(rootPath, envName);
        this.load(envPath);
    }

    static load(filePath) {
        if (!fs.existsSync(filePath)) {
            console.log(`not found env file. ${filePath}`);
            //    process.exit(0);
        }

        const env = dotEnv.config({
            path: filePath,
            debug: true,
        });

        console.log('dot env loaded. ' + filePath);
        console.log(env.parsed);
    }
}
