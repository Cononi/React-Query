import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Post {
    userId: number
    id: number
    title: string
    body?: string
}

const maxPostPage = 10;

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
    );
    return response.json();
}

function Posts() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState<Post>();

    // 쿼리 키, 데이터를 가져오는 비동기 함수 선언(매핑하는 데이터는 fetchPosts에서 반환된 데이터가 되고 HTTP 요청에서 반환된 JSON이 된다.)
    // 구조 분해 방식
    const { data, isError, error, isLoading } = useQuery<Post[], Error>(['posts'], fetchPosts)

    // array map은 배열전용 이기 떄문에 현재 데이터가 정의되지 않았다고 나온다. 
    // fetchPosts가 비동기이기 때문에 실행 컨텍스트 관점에서 보면 비동기가 실행되기전에 해당 컴포넌트의 return가 먼저 실행되기 때문에 해당 내용이 없다고 나온다.
    // --구현체 
    // if (!data) return <div></div> 

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
                <button disabled onClick={() => { }}>
                    Previous page
                </button>
                <span>Page {currentPage + 1}</span>
                <button disabled onClick={() => { }}>
                    Next page
                </button>
            </div>
            <div>
                <h3>나의 이야기</h3>
                <button>삭제</button>
                <button>타이틀 변경</button>
                <div style={{
                    border: '1px solid black',
                }}>
                    {selectedPost?.body}
                </div>
                <div>
                    <h3>덧글</h3>
                </div>
            </div>
        </div>
    )
}

export default Posts