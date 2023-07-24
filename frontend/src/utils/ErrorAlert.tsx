import Snackbar from "@mui/material/Snackbar";

export default function ErrorAlert(message: string) {
  return <Snackbar open={true} autoHideDuration={5000} message={message} />;
}
