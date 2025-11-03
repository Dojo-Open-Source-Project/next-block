import { eventStream } from "remix-utils/sse/server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { Result } from "@samouraiwallet/one-dollar-fee-estimator";

import { EstimatorService } from "~/services/estimator.server";

export async function loader({ request }: LoaderFunctionArgs) {
	return eventStream(request.signal, (send) => {
		const listener = (data: Result) => {
			send({ event: "fees", data: JSON.stringify(data) });
		};

		EstimatorService.on("data", listener);

		return () => {
			EstimatorService.off("data", listener);
		};
	});
}
