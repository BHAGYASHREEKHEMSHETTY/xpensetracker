import Home from "./components/pages/Home/Home";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    
      
      <SnackbarProvider>
        <Home />
      </SnackbarProvider>
    
  );
}
