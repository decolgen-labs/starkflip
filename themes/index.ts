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
export const Menu: ComponentStyleConfig = {
  variants: {
    profile: {
      list: {
        // this will style the MenuList component
        py: "4",
        borderRadius: "xl",
        border: "none",
        bg: "#018576",
      },
      item: {
        bg: "inherit",
        color: "gray.200",
        pl: 5,
        display: "flex",
        gap: 4,
        _hover: {
          bg: "primary.game.200",
        },
      },
      command: {
        opacity: "0.8",
        fontFamily: "mono",
        fontSize: "sm",
        letterSpacing: "tighter",
        pl: "4",
      },
      divider: {
        // this will style the MenuDivider component
        my: "4",
      },
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
  },
});

export default theme;
