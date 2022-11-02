import React from "react";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/list" element={<UserList />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
