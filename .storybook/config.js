import { configure, addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

configure(
  require.context("../src", true, /\.stories\.(js|jsx|ts|tsx|mdx)$/),
  module
);

addParameters({
  options: {
    enableShortcuts: false
  },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});
