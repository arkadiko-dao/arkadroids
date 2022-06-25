import { createContext } from 'react';
import { UserSession, AppConfig, UserData } from '@stacks/auth';

export interface UserEligibility {
  arkadiko: boolean;
  btc: boolean;
  diko: boolean;
  usda: boolean;
  stx: boolean;
  ldn: boolean;
}

export interface AppState {
  userData: UserData | null;
  eligibility: UserEligibility;
}

export const defaultEligibility = () => {
  return {
    arkadiko: false,
    btc: false,
    diko: false,
    usda: false,
    stx: false,
    ldn: false,
  };
};

export const defaultState = (): AppState => {
  const appConfig = new AppConfig(['store_write'], document.location.href);
  const userSession = new UserSession({ appConfig });

  if (userSession.isUserSignedIn()) {
    return {
      userData: userSession.loadUserData(),
      eligibility: defaultEligibility(),
    };
  }

  return {
    userData: null,
    eligibility: defaultEligibility(),
  };
};

export const AppContext = createContext<AppState[]>([defaultState()]);
