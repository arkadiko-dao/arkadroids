import React, { useEffect } from 'react';
import { Header } from '@components/header';
import { About } from '@components/about';
import { Eligibility } from '@components/eligibility';
import { CardGroup } from '@components/card-group';
import { Footer } from '@components/footer';
import { Connect } from '@stacks/connect-react';
import { AuthOptions } from '@stacks/connect';
import { UserSession, AppConfig } from '@stacks/auth';
import { resolveSTXAddress } from '@common/use-stx-address';
import { defaultState, AppContext, AppState } from '@common/context';
import { checkEligibility, eligibilityDroids } from '@common/droids';

const icon = 'https://arkadiko.finance/favicon.ico';
export const App: React.FC = () => {
  const [state, setState] = React.useState<AppState>(defaultState());
  const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);
  const userSession = new UserSession({ appConfig });

  const signOut = () => {
    userSession.signUserOut();

    setState(defaultState());
  };

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();

      const address = resolveSTXAddress(userData);
      const eligibility = checkEligibility(address);

      setState(prevState => ({ ...prevState, userData, eligibility }));

      const getData = async () => {
        try {
          const address = resolveSTXAddress(userData);
        } catch (error) {
          console.error(error);
        }
      };
      void getData();
    } else {
    }
  }, []);

  const handleRedirectAuth = async () => {
    if (userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn();
      setState(prevState => ({ ...prevState, userData }));
    } else {
    }
  };

  React.useEffect(() => {
    void handleRedirectAuth();
  }, []);

  const authOptions: AuthOptions = {
    manifestPath: '/static/manifest.json',
    redirectTo: '/',
    userSession,
    onFinish: ({ userSession }) => {
      const userData = userSession.loadUserData();

      const address = resolveSTXAddress(userData);
      const eligibility = checkEligibility(address);

      setState(prevState => ({ ...prevState, userData, eligibility }));
    },
    appDetails: {
      name: 'Arkadroids',
      icon,
    },
  };

  return (
    <Connect authOptions={authOptions}>
      <AppContext.Provider value={[state, setState]}>
        <div>
          <Header signOut={signOut} />
          <About />
          <Eligibility signOut={signOut} />
          <CardGroup droids={eligibilityDroids(state.eligibility)} />
          <Footer />
        </div>
      </AppContext.Provider>
    </Connect>
  );
};
