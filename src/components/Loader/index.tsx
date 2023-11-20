import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack>
    </div>
  );
};

export default Loader;
