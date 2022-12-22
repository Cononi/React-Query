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

const Posts = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState<Post>();

    // 쿼리 키, 데이터를 가져오는 비동기 함수 선언(매핑하는 데이터는 fetchPosts에서 반환된 데이터가 되고 HTTP 요청에서 반환된 JSON이 된다.)
    const { data } = useQuery<Post[], Error>(['posts'], fetchPosts)

    // array map은 배열전용 이기 떄문에 현재 데이터가 정의되지 않았다고 나온다. 
    // fetchPosts가 비동기이기 때문에 실행 컨텍스트 관점에서 보면 비동기가 실행되기전에 해당 컴포넌트의 return가 먼저 실행되기 때문에 해당 내용이 없다고 나온다.
    if (!data) return <div></div>

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(post => {
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
            <div>
                {selectedPost?.body}
            </div>
        </>
    )
}

export default Posts