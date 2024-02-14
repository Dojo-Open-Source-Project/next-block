import { FC } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const FAQModal: FC<Props> = ({ open, handleClose }) => {
  return (
    <div
      className={`fixed left-0 top-0 w-full h-full max-h-screen max-w-screen flex items-center justify-center py-20 px-8 ${open ? "" : "pointer-events-none"}`}
    >
      <div className={`absolute left-0 top-0 w-full h-full transition ${open ? "backdrop-blur-sm" : "backdrop-blur-none"}`} onClick={handleClose} role="none" />
      <div
        className={`rounded bg-footer shadow-2xl p-4 md:p-8 overflow-auto mx-auto my-auto max-w-4xl w-full max-h-full relative transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        role="dialog"
      >
        <button className="absolute top-4 right-5 font-primary font-bold text-xl cursor-pointer hover:text-secondary transition-colors" onClick={handleClose}>
          &#x2715;
        </button>
        <div className="grid grid-cols-1 gap-6 text-left font-thin">
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">How does this work?</h2>
            <p>
              The fee estimator assesses all the unconfirmed transactions in the mempool, then computes at what miner fee rate a transaction needs to be
              broadcasted right now for it to be confirmed into the next block.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <strong>High</strong> = 99% probability your transaction will confirm in the next block
              </li>
              <li>
                <strong>Medium</strong> = 50% probability your transaction will confirm in the next block
              </li>
              <li>
                <strong>Low</strong> = 10% probability your transaction will confirm in the next block
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">Who is this tool for?</h2>
            <p>Any individual who has two objectives when broadcasting a transaction:</p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Objective 1:</strong> have your transaction confirmed within a timely manner, ideally within the next block
              </li>
              <li>
                <strong>Objective 2:</strong> reduce the amount of overpaid miner fees
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">Why is this fee estimator different to others available?</h2>
            <p>
              There are many methods which attempt to provide you with a miner fee rate estimation, some of these are integrated into bitcoin wallets, some are
              standalone applications. To date we have found most to be unreliable particularly during moments of miner fee rate volatility. Any application or
              tool which tells you &quot;your transaction is expected be confirmed within 4/6/12/24 blocks&quot; is being dishonest as its calculation uses
              already confirmed blocks to draw this conclusion which is a flawed methodology.
            </p>
            <p>
              By assessing the unconfirmed transactions within the mempool, this tool provides instead an <strong>instant snapshot probability</strong> for
              being confirmed in the <strong>next block</strong>. Attempting to calculate beyond this (i.e. for your transaction to be confirmed 6 blocks from
              now) introduces too many variables which would make any calculation mathematically unsound. These variables which can not be accurately accounted
              for include:
            </p>
            <ul className="list-disc list-inside">
              <li>Block confirmation time variance</li>
              <li>Unknown state of future mempool</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">Why is the fee rate the same for two or all three of the percentages?</h2>
            <p>
              This is normal and occurs very frequently because at that moment in time unconfirmed transactions in the mempool are weighted around a particular
              popular miner fee rate. As the weight of miner fee rates in the mempool diverge, in turn so will the calculation for the 10%, 50%, and 99% fee
              estimator value.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">
              If I broadcast a transaction with the 99% miner fee rate it will confirm in the next block, right?
            </h2>
            <p>
              We would love to say yes, but unfortunately we cannot. 99% is a <strong>snapshot probability</strong> and the mempool state may drastically change
              between you broadcasting the transaction and the next block being mined. However in our experience with Objective 1 and 2 in mind, our next block
              fee estimator is far superior than any other available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
