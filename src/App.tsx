import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Home from "./pages/Home";


// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    
      <div className="App">
        <Home />
      </div>
    
  );
};

export default App;
