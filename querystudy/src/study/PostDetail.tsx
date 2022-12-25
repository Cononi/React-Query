import { useQuery, useMutation } from "@tanstack/react-query";
import { PostDetailData, PostDetailProps } from "./postTypes";

async function fetchComments(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json()
}

async function deletePost(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: 'DELETE' }
    )
    return response.json()
}

async function updatePost(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "PATCH", body: '타이틀 변경헌다!'}
        // data : { title: "타이틀 변경은 영원하리!!"}
    )
    return response.json()
}

const PostDetail = ({ post }: PostDetailProps) => {

    const { data, isError, error, isLoading } = useQuery<PostDetailData[], Error>(['comments', post.id], () => fetchComments(post?.id))

    // 구조분해한 데이터의 return 네임이 겹치므로 return 하지 않는다.
    // 쿼리 키와 관련 있는 캐시 내부의 데이터와 상관 없으니까 대신 함수를 부여한다.
    // useMutation과 useQuery의 또 다른 차이점이 등장하는데 useQuery에 인수로서 전달하는 쿼리 함수와는 달리 우리가 인수로 전달하는 변이 함수의 경우 그 자체도 인수를 받을 수 있다.
    // useMutation에서 객체는 변이 함수를 반환하게 된다. 즉, 누군가 Delete 버튼을 클릭할 때 이 변이 함수를 실행하려는 것이다.
    // postId는 props에서 유래하였으므로 함수 인수에 post.id라고만 입력해도 무방하다.
    // 이 컴포넌트에 대한 호출이 이루어 질때마다 변경되지는 않는다.
    // 이것의 핵심은 여기에 인수를 제공할 수 있다는걸 설명하기 위한 것이다.
    const deleteMutation = useMutation((postId: number) => deletePost(postId))
    const updateMutation = useMutation((postId: number) => updatePost(postId))

    if (isLoading) return <div>Loading</div>
    if (isError) return (
        <>
            <p>Error</p>
            <div>{error.message}</div>
        </>
    )

    return (
        <>
            {/* 객체를 반환하는 deleteMutation과 속성 함수인 mutate를 실행하게 된다. props에서 받은 postId가 무엇이든 상관없이 실행하게 된다.
            변이 함수를 호출할 때면 인수가 mutate(인수)에 할당된다.
            할당되어 props -> delete포스트에 전달된다.
            */}
            <button onClick={() => deleteMutation.mutate(post.id)}>삭제</button>
            {/* 진행중인 작업의 인디케이션을 사용자에게 제공한다.
            조건부 문단 생성하고 오류가 발생할 경우 에러를 나타내는 메세지를 보여준다. */}
            {/* 진행 불가일 때 */}
            {deleteMutation.isError && <p style={{ color: 'red' }}>해당 데이터를 삭제하지 못했습니다.</p>}
            {/* 기다리는 동안 로딩되는 상황을 제시한다. */}
            {deleteMutation.isLoading && <p style={{ color: 'purple' }}>해당 데이터를 삭제중입니다.</p>}
            {/* isLoading이 참이면 포스트를 삭제하라고 전달한다. useQuery에 존재햇으나 쓰지 않은 메소드를 활용 */}
            {/* isSuccess가 있다면 이 API의 방식으로 인해 페이지에서 데이터를 변경함을 통해 성공적인 변이를 제시할 수 없다.( 이 api는 실제로 변경하지 않기 때문 )*/}
            {/* 그러나 변이가 성공적이었다는건 사용자에게 나타내 줄 수 있다. 그리고 삭제되지 않았다고 출력할텐데 이 API에서는 할 수 없기 때문이다.*/}
            {deleteMutation.isSuccess && <p style={{ color: 'green' }}>해당 데이터를 삭제하지 못했습니다.!</p>}

            {updateMutation.isError && <p color="red">타이틀 변경 실패!</p>}
            {updateMutation.isLoading && <p color="purple">타이틀 변경중!!</p>}
            {updateMutation.isSuccess && <p color="green">타이틀 변경 성공</p>}

            <button onClick={() => updateMutation.mutate(post.id)}>제목 수정</button>
            <h3 style={{ color: "blue" }}>Comments</h3>
            {data?.map(detail => {
                return (
                    <div key={detail.id}>
                        {detail.email} : {detail.body}
                        <br />
                    </div>
                )
            })}
        </>
    )
}

export default PostDetail