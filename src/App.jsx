import { QueryClient, QueryClientProvider } from "react-query";
import Data from "./components/Data";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Data />
    </QueryClientProvider>
  );
}
