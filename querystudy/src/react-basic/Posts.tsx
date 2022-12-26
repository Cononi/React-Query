import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PostData } from "./postTypes";
import PostDetail from "./PostDetail";

const maxPostPage = 10;

const fetchPosts = async (pageNum: number): Promise<PostData[]> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    );
    return response.json();
}

function Posts() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedPost, setSelectedPost] = useState<PostData>();

    const queryClient = useQueryClient() // useQuery Hook

    // currentPage가 변경이 감지되면 랜더링되기 전에 해당 구현내용을 실행한다.
    useEffect(() => {
        // 알고 있는 범위 외의 데이터를 가져오지 않도록 조건 추가
        // 최종 페이지 이전이라면 프리페칭이 이루어지지만 최종 페이지에 있다면 미리 가져올 데이터가 없기때문에 Prefetching을 하지 않는다.
        if (currentPage < maxPostPage) {
            // 다음 페이지가 무엇이든 데이터를 미리 가져온다.
            const nextPage = currentPage + 1
            // PreFetchQuery의 인수는 useQuery의 인수와 아주 흡사하다.
            // 필요한 인자는 useQuery에 사용한 쿼리 키와 똑같은 모습을 하고 있다.
            // React Query가 캐시에 이미 데이터가 있는지는 query Key로 판별한다.
            // 그러니 prefetchQuery를 알려면 해당하는 쿼리 키로 구현해줘야 한다.
            queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage))
        }
    }, [currentPage, queryClient]) // currentPage말고 queryClient라는 의존성이 하나 더 생겼으니 추가해야한다.


    // 쿼리 키, 데이터를 가져오는 비동기 함수 선언(매핑하는 데이터는 fetchPosts에서 반환된 데이터가 되고 HTTP 요청에서 반환된 JSON이 된다.)
    // 구조 분해 방식
    const { data, isError, error, isLoading, isFetching } = useQuery<PostData[], Error>(
        ["posts", currentPage],
        () => fetchPosts(currentPage),
        { // Option
            // 2초마다 만료처리 되도록 설정 (데이터의 유통기한),
            staleTime: 2000,
            /* 쿼리 키가 바뀔 때도 지난 데이터를 유지해서 혹여나 이전 페이지로 돌아갔을 때 캐시에 해당 데이터가 있도록 만들고 싶을때 주는 옵션*/
            keepPreviousData: true
        })

    // array map은 배열전용 이기 떄문에 현재 데이터가 정의되지 않았다고 나온다. 
    // fetchPosts가 비동기이기 때문에 실행 컨텍스트 관점에서 보면 비동기가 실행되기전에 해당 컴포넌트의 return가 먼저 실행되기 때문에 해당 내용이 없다고 나온다.
    // --구현체 
    // if (!data) return <div></div> 

    // 캐시 데이터의 존재 여부와 관계 없이 실행
    // if(isFetching) return <h3>Loading...</h3>

    // 로드 중인지 확인
    if (isLoading) return <h3>Loading...</h3>
    // 에러로 받아오지 못할 때 조기 반환한다.
    if (isError) return <>
        <h3>Not Data</h3>
        <p>{error.message}</p>
    </>

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '100px' }}>
            <table border={1}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(post => {
                        return (
                            <tr key={post.id}
                                className="post-title"
                                onClick={() => setSelectedPost(post)}
                            >
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.userId}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <button
                    disabled={currentPage < 1} // current Page가 1보다 작으면 비활성화 처리
                    onClick={() => {
                        // previousValue는 자기 자신의 as 같은것이다. 자기 자신의 데이터를 가지키지만 이름을 부여해준것
                        setCurrentPage((previousValue) => previousValue - 1)
                    }}>
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={currentPage >= maxPostPage} // current page가 maxPostPage와 같거나 그보다 클 경우 비활성화 처리
                    onClick={() => {
                        setCurrentPage((nextValue) => nextValue + 1)
                    }}>
                    Next page
                </button>
            </div>
            <div>
                <h3>나의 이야기</h3>
                <div style={{
                    border: '1px solid black',
                }}>
                    {selectedPost?.body}
                </div>
                {selectedPost &&
                    <div>
                        <PostDetail post={selectedPost} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Posts