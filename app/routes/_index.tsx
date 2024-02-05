import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEventSource } from "remix-utils/sse/react";
import { useState } from "react";
import type { Result } from "@samouraiwallet/one-dollar-fee-estimator";

import { EstimatorService } from "~/estimator.server";
import { FeeBox, FAQModal, Footer, Header, Links } from "~/components";

const siteName = "Fee Estimator";
const description = "Bitcoin transaction fee estimator to get you to the next block.";
const image = "https://fees.samouraiwallet.com/og-image.png";

export const meta: MetaFunction = () => {
  return [
    { title: siteName },
    { name: "description", content: description },
    { property: "og:title", content: siteName },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: siteName },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "robots", content: "index, follow" },
  ];
};

export const loader = () => {
  return EstimatorService.data;
};

const useLoaderEventSource = () => {
  const loaderResult = useLoaderData<typeof loader>();
  const sseResultStr = useEventSource("/sse/fees", { event: "fees" });
  return sseResultStr ? (JSON.parse(sseResultStr) as Result) : loaderResult;
};

export default function Index() {
  const result = useLoaderEventSource();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="h-full grid grid-cols-1 gap-2 grid-rows-[_100px_1fr_70px_50px] items-center justify-items-center">
        <Header />
        <main className="container grid gap-8 grid-cols-1 text-center px-4">
          <h1 className="font-primary text-6xl font-bold">{siteName}</h1>
          <p>What are the feerates that will get your transaction into the next block?</p>
          <div className="font-thin font-primary">
            Last block height:{" "}
            <a className="font-normal" href={`https://oxt.me/block/${result.lastBlockHeight}`} target="_blank" rel="noreferrer" title="Open on OXT">
              {result.lastBlockHeight ?? "--"}
            </a>
          </div>
          <div className="flex justify-center flex-col md:flex-row items-center relative">
            <FeeBox label="Low" target={"0.1"} fees={result.fees} />
            <FeeBox label="Medium" target={"0.5"} fees={result.fees} />
            <FeeBox label="High" target={"0.99"} fees={result.fees} />
            {!result.ready && (
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full backdrop-blur-sm flex items-center justify-center text-center font-bold text-white">
                <span className="drop-shadow-md">Cannot provide feerate estimates, mempool not fully synced.</span>
              </div>
            )}
          </div>
          <div className="mt-12">
            <button
              className="px-6 py-1 border border-secondary rounded bg-footer hover:text-gray-300 transition-colors font-primary font-bold shadow"
              onClick={() => setModalOpen(true)}
            >
              How does this work?
            </button>
          </div>
        </main>
        <Links />
        <Footer siteName={siteName} />
      </div>
      <FAQModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}