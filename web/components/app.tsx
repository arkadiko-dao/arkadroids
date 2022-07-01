import React, { useEffect } from 'react';
import { About } from '@components/about';
import { Eligibility } from '@components/eligibility';
import { CardGroup } from '@components/card-group';
import { Footer } from '@components/footer';
import { ThemeProvider, theme } from '@blockstack/ui';
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
    console.log('signedOut');

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
          console.log(address);
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
      console.log(state);
    },
    appDetails: {
      name: 'Arkadroids',
      icon,
    },
  };

  return (
    <Connect authOptions={authOptions}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={[state, setState]}>
          <div className="dark">
            <h1 className="hacked text-white text-lg md:text-xl px-10 bg-black">Arkadroids</h1>
            <About />
            <Eligibility signOut={signOut} />
            <CardGroup droids={eligibilityDroids(state.eligibility)} />
            <Footer />
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    </Connect>
  );
};
