import { convertHex } from "./../utils/convertHex";
import {
  extendTheme,
  ComponentStyleConfig,
  ThemeConfig,
} from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/system";

export const colors = {
  primary: {
    green: {
      100: "#00FFB3",
      200: "#012E3F",
      300: "#018576",
      /*  400: '#2DB24A',
      500: '#248E3B',
      600: '#1B6B2C', */
    },
  },
  secondary: {
    100: "#FF7D7D",
    200: "#FF5C5C",
  },
};
const styles = {
  // eslint-disable-next-line no-unused-vars
  global: (props: StyleFunctionProps) => ({
    body: {
      background: "url('/assets/art/frame.svg')",
    },
  }),
};
const Button: ComponentStyleConfig = {
  variants: {
    primary: {
      color: "primary.green.300",
      bg: "primary.green.200",
      fontWeight: "900",
      borderRadius: "16px",
      border: "0.064rem solid",
      borderColor: "primary.green.100",
      transition: "0.2s ease all",
      _hover: {
        border: "4px solid #00FFB3",
        bg: "primary.green.200",
        color: "#00FFB3",
      },
      _active: {
        bg: "#00FFB3",
        color: "primary.green.200",
      },
    },
  },
};
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const Menu: ComponentStyleConfig = {
  variants: {
    profile: {
      list: {
        // this will style the MenuList component
        py: { lg: "4", base: 2 },
        minWidth: { lg: "200px", base: "150px" },
        borderRadius: "xl",
        border: "2px solid",
        borderColor: "#0BDD7B",
        bg: "#0BDD7B33",
      },
      item: {
        bg: "none",
        color: "gray.200",
        pl: { lg: 5, base: 2 },
        fontWeight: "bold",
        display: "flex",

        fontSize: { lg: "lg", base: "sm" },
        gap: { lg: 4, base: 2 },
        _hover: {
          bg: convertHex("#0BDD7B", 0.5),
        },
      },
    },
  },
};

const Tabs: ComponentStyleConfig = {
  variants: {
    primary: {
      root: {
        bg: "rgba(1, 133, 118, 0.2)",
        borderRadius: "24px",
        border: "1px solid rgba(1, 133, 118, 1)",
        // width: { lg: "600px", base: "100%" },
      },
      tab: {
        py: 1,
        px: 4,
        borderRadius: "24px",
        _selected: {
          background: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        },
      },
      tablist: {
        color: "white",
        background: "rgba(1, 133, 118, 0.5)",
        width: "fit-content",
        p: 1,
        borderRadius: "24px",
      },
      tabpanels: {},
      tabpanel: {},
    },
  },
};
const theme = extendTheme({
  colors,
  styles,
  config,
  components: {
    Button,
    Menu,
    Tabs,
  },
});

export default theme;
