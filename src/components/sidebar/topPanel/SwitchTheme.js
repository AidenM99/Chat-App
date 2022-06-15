import { useContext } from "react";
import { IconButton } from "@mui/material";
import { getThemePref } from "../../../theme/theme";
import { ColorModeContext } from "../../../hooks/Context";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const SwitchTheme = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton aria-label="switch-theme" onClick={colorMode.toggleColorMode}>
      {getThemePref() === "dark" || getThemePref() === null ? (
        <LightModeIcon color="primary" fontSize="small" />
      ) : (
        <DarkModeIcon color="primary" fontSize="small" />
      )}
    </IconButton>
  );
};

export default SwitchTheme;
