import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const TanstackProvider = ({ children }) => {
  const client = new QueryClient();
  return /* @__PURE__ */ React.createElement(QueryClientProvider, { client }, children);
};

export { TanstackProvider };
//# sourceMappingURL=tanstack-provider.mjs.map
//# sourceMappingURL=tanstack-provider.mjs.map