import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary.main"
      display="flex"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <CircularProgress color="secondary" size="5rem" />
    </Box>
  );
};

export default Loading;
