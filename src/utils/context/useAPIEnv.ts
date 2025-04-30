import { useContext } from 'react';
import { APIEnvContext } from './APIEnvContext';

export const useAPIEnv = () => {
  const context = useContext(APIEnvContext);
  if (!context) {
    throw new Error('useAPIEnv must be used within a useAPIEnv');
  }
  return context;
};