import type { ReactNode } from 'react';

type Provider = ({ children }: { children: ReactNode }) => JSX.Element;

export function composeProviders(...providers: Provider[]) {
  return ({ children }: { children: ReactNode }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children);
  };
}