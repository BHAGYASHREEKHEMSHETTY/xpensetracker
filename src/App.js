import Home from "./components/pages/Home/Home";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <>
      <h1>Expense Tracker</h1>
      <SnackbarProvider>
        <Home />
      </SnackbarProvider>
    </>
  );
}
