import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">

        <ReactQueryDevtools />
      </div >
    </QueryClientProvider>
  );
}

export default App;
