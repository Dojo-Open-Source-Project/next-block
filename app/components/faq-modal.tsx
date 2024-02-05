import { FC, useEffect, useRef } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const TRANSITION_MS = 200;

export const FAQModal: FC<Props> = ({ open, handleClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start: number;
    const element = ref.current;

    function step(timestamp: number) {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;

      // Update the opacity using the elapsed time
      if (element) {
        element.style.opacity = String(Math.min(elapsed / TRANSITION_MS, open ? 1 : 0));
      }

      if (elapsed < TRANSITION_MS) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-screen overflow-auto opacity-0 p-4"
      hidden={!open}
    >
      <div className="rounded bg-footer shadow-2xl p-8 md:p-16">
        <button className="absolute top-7 right-8 font-primary font-bold text-xl cursor-pointer hover:text-secondary transition-colors" onClick={handleClose}>
          &#x2715;
        </button>
        <div className="grid grid-cols-1 gap-6 text-left">
          <div>
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">How does this work?</h2>
            <p>
              The $1 Fee Estimator calculates a feerate for a target (50%, 90%, ...) that a transaction needs to have in order to be included in the next block
              at the moment.
            </p>
          </div>
          <div>
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">So if I pick 99%, my transaction will get confirmed immediately, right?</h2>
            <p>
              Bitcoin mempool is very volatile and sometimes there can be huge times between two mined blocks. So no, nothing is absolutely guaranteed, even for
              99% target.
            </p>
          </div>
          <div>
            <h2 className="font-primary font-bold text-xl text-gray-300 mb-2">Why is this better than other fee estimators?</h2>
            <p>
              The $1 Fee Estimator observes incoming blocks and dynamism of the mempool. Based on our observations, it is very accurate under standard mempool
              conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
