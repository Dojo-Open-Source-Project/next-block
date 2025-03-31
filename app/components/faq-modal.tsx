import { forwardRef, ForwardRefRenderFunction } from "react";

type Props = {
  handleClose: () => void;
};

const Modal: ForwardRefRenderFunction<HTMLDialogElement | null, Props> = ({ handleClose }, ref) => {
  return (
    <dialog ref={ref} className="max-h-[80%]">
      <div className="p-4 md:p-8">
        <button className="absolute top-4 right-5 font-primary font-bold text-xl cursor-pointer hover:text-secondary transition-colors" onClick={handleClose}>
          &#x2715;
        </button>
        <div className="grid grid-cols-1 gap-6 text-left font-thin">
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">How does this work?</h2>
            <p>
              The Next Block estimator assesses all the unconfirmed transactions in the mempool, then computes at what miner fee rate a transaction needs to be
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
            <p>
              If you want a detailed explanation, read{" "}
              <a href="https://github.com/Archive-Samourai-Wallet/one_dollar_fee_estimator" target="_blank" rel="noreferrer">
                the original Readme
              </a>
              .
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">Who is this tool for?</h2>
            <p>Any individual who has two objectives when broadcasting a transaction:</p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Objective 1:</strong> have your transaction confirmed in a timely manner, ideally in the next block
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
              tool which tells you &quot;your transaction is expected to be confirmed within 4/6/12/24 blocks&quot; is being dishonest as its calculation uses
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
              fee estimator is far superior than others.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export const FAQModal = forwardRef<HTMLDialogElement | null, Props>(Modal);
