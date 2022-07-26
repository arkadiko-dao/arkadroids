import React, { useContext } from 'react';
import { useConnect } from '@stacks/connect-react';
import { AppContext } from '@common/context';

interface EligibilityProps {
  signOut: () => void;
}

export const Eligibility: React.FC<EligibilityProps> = ({ signOut }) => {
  const [state, _] = useContext(AppContext);
  const { doOpenAuth } = useConnect();

  return (
    <div className="container px-4 pt-16 mx-auto sm:pt-28">
      <h2 className="pb-10 text-center font-syne-mono text-medium md:text-lg text-almost-white neonText">Eligibility</h2>
      <p className="max-w-5xl mx-auto text-base text-center font-syne-mono text-almost-white">
        Are you eligible for an Arkadroid?
      </p>
      {!state.userData ? (
        <p className="max-w-5xl mx-auto text-base text-center font-syne-mono text-almost-white">
          Check now by connecting your wallet.
        </p>
      ) : null}

      <div className="flex items-center justify-center mt-6">
        {state.userData ? (
          <button
            type="button"
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-transparent border border-transparent rounded-md shadow-sm hover:bg-transparent focus:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple"
            onClick={() => signOut()}
          >
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            type="button"
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm shadow-purple/50 bg-purple/20 hover:bg-purple/40 focus:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple"
            onClick={() => doOpenAuth()}
          >
            <span>Connect Wallet</span>
          </button>
        )}
      </div>

      <p className="max-w-xl p-4 mx-auto mt-6 text-base text-center border rounded-md shadow-lg font-syne-mono text-almost-white border-almost-white/20 shadow-purple/5">
        <span className="text-base uppercase">Hint:</span>The Arkadroids you are eligible for will have a <span className="text-almost-white neonText">purple glow</span> around them.
      </p>
    </div>
  );
};
