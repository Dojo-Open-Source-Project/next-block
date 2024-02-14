import * as assert from "assert";
import { configDotenv } from "dotenv";

const config = configDotenv();

assert.ok(config.parsed?.HOSTNAME, "Missing HOSTNAME env variable");
assert.ok(config.parsed?.BITCOIND_USERNAME, "Missing BITCOIND_USERNAME env variable");
assert.ok(config.parsed?.BITCOIND_PASSWORD, "Missing BITCOIND_PASSWORD env variable");
assert.ok(config.parsed?.BITCOIND_HOST, "Missing BITCOIND_HOST env variable");
assert.ok(config.parsed?.BITCOIND_PORT, "Missing BITCOIND_PORT env variable");

export const serverConfig = {
  HOSTNAME: config.parsed.HOSTNAME,
  BITCOIND_USERNAME: config.parsed.BITCOIND_USERNAME,
  BITCOIND_PASSWORD: config.parsed.BITCOIND_PASSWORD,
  BITCOIND_HOST: config.parsed.BITCOIND_HOST,
  BITCOIND_PORT: Number(config.parsed.BITCOIND_PORT),
};
