'use strict';

var reactQuery = require('@tanstack/react-query');
var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const TanstackProvider = ({ children }) => {
  const client = new reactQuery.QueryClient();
  return /* @__PURE__ */ React__default.default.createElement(reactQuery.QueryClientProvider, { client }, children);
};

exports.TanstackProvider = TanstackProvider;
//# sourceMappingURL=tanstack-provider.js.map
//# sourceMappingURL=tanstack-provider.js.map