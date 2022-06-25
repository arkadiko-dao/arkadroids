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
    <div className="container mx-auto md:px-20 px-10 pt-28 items-center">
      <p className="syne-mono text-base text-almost-white text-center">
        Are you eligible for an arkadroid? Check now by connecting your wallet.
      </p>
      {state.userData ? (
        <button
          type="button"
          className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => signOut()}
        >
          <span>Sign Out</span>
        </button>
      ) : (
        <button
          type="button"
          className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => doOpenAuth()}
        >
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
};
