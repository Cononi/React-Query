import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Posts from './study/Posts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Posts />
        <ReactQueryDevtools  initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
