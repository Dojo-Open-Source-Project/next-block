import * as assert from "assert";
import { FeeEstimator } from "@samouraiwallet/one-dollar-fee-estimator";
import { configDotenv } from "dotenv";

const config = configDotenv();

assert.ok(config.parsed?.BITCOIND_USERNAME, "Missing BITCOIND_USERNAME env variable");
assert.ok(config.parsed?.BITCOIND_PASSWORD, "Missing BITCOIND_PASSWORD env variable");
assert.ok(config.parsed?.BITCOIND_HOST, "Missing BITCOIND_HOST env variable");
assert.ok(config.parsed?.BITCOIND_PORT, "Missing BITCOIND_PORT env variable");

export const EstimatorService = new FeeEstimator({
  refresh: 20,
  useWorker: true,
  rpcOptions: {
    username: config.parsed.BITCOIND_USERNAME,
    password: config.parsed.BITCOIND_PASSWORD,
    host: config.parsed.BITCOIND_HOST,
    port: Number(config.parsed.BITCOIND_PORT),
  },
});
