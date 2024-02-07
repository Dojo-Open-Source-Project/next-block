import { FeeEstimator } from "@samouraiwallet/one-dollar-fee-estimator";

import { serverConfig } from "~/config.server";

export const EstimatorService = new FeeEstimator({
  refresh: 20,
  useWorker: true,
  rpcOptions: {
    username: serverConfig.BITCOIND_USERNAME,
    password: serverConfig.BITCOIND_PASSWORD,
    host: serverConfig.BITCOIND_HOST,
    port: serverConfig.BITCOIND_PORT,
  },
});
