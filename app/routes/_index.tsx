import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEventSource } from "remix-utils/sse/react";
import { useState } from "react";
import type { Result } from "@samouraiwallet/one-dollar-fee-estimator";

import { EstimatorService } from "~/services/estimator.server";
import { FeeBox, FAQModal, Footer, Header, Links } from "~/components";
import { serverConfig } from "~/config/config.server";

const siteName = "Fee Estimator";
const description = "Bitcoin transaction fee estimator to get you to the next block.";
const image = "/og-image.png";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
};

const timeSinceLastBlock = (lastBlockTime: number | undefined): string => {
  if (!lastBlockTime) return "";
  const currentTime = Math.floor(Date.now() / 1000);

  const secondsSinceLastBlock = currentTime - lastBlockTime;
  return formatTime(secondsSinceLastBlock);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { hostname } = data!;
  const baseUrl = `https://${hostname}`;
  const imageUrl = baseUrl + image;

  return [
    { title: siteName },
    { name: "description", content: description },
    { property: "og:title", content: siteName },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:url", content: baseUrl },
    { name: "twitter:creator", content: "@samouraiwallet" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: siteName },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "robots", content: "index, follow" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: baseUrl,
        name: siteName,
        description: description,
        image: imageUrl,
      },
    },
  ];
};

export const loader = () => {
  return {
    hostname: serverConfig.HOSTNAME,
    estimatorData: EstimatorService.data,
  };
};

const useLoaderEventSource = () => {
  const { estimatorData } = useLoaderData<typeof loader>();
  const sseResultStr = useEventSource("/sse/fees", { event: "fees" });
  return sseResultStr ? (JSON.parse(sseResultStr) as Result) : estimatorData;
};

export default function Index() {
  const result = useLoaderEventSource();
  const [modalOpen, setModalOpen] = useState(false);

  const blockHeight = result.lastBlock?.height;
  const blockTime = result.lastBlock?.time;

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 gap-2 grid-rows-[_100px_1fr_70px_50px] items-center justify-items-center">
        <Header />
        <main className="container grid gap-8 grid-cols-1 text-center px-4">
          <h1 className="font-primary text-6xl font-bold">{siteName}</h1>
          <p>What are the feerates that will get your transaction into the next block?</p>
          <div className="font-thin font-primary">
            Last block height:{" "}
            <a className="font-normal" href={`https://oxt.me/block/${blockHeight ?? "0"}`} target="_blank" rel="noreferrer" title="Open on OXT">
              {blockHeight ?? "--"}
            </a>{" "}
            <span title={blockTime ? new Date(blockTime * 1000).toJSON() : undefined}>({timeSinceLastBlock(blockTime)})</span>
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
