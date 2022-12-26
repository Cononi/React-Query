import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { InfiniteSpecies } from './\bstudy/species/InfiniteSpecies';
import { useState } from 'react';
import InfinitePeople from './\bstudy/people/InfinitePeople';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

interface mapInterfaces {
  [key: string]: JSX.Element

}

function App() {
  const [isChange, setIsChange] = useState(false)

  const onClickApiComponentChange = () => {

  }

  const ApiComponent = () => {
    const map: mapInterfaces = {
      false: <InfinitePeople />,
      // true : <InfiniteSpecies/>
    }
    return map[String(isChange)]
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* 정교한 앱이면 선택에 따라서 분기를 줘서 해당 스타일을 볼 수 있다.
        하지만 공부를 위해 여기에 분기를 줘봤다~ */}
        <button onClick={() => setIsChange(e => !e)}>API 변경</button>
        <ApiComponent />
      </div >
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
