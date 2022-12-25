import { useQuery } from "@tanstack/react-query";
import { PostDetailData, PostDetailProps } from "./postTypes";

async function fetchComments(postId: number) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json()
}

const PostDetail = ({ post }: PostDetailProps) => {

    const { data, isError, error, isLoading } = useQuery<PostDetailData[], Error>(['comments',post.id], () => fetchComments(post?.id))

    if (isLoading) return <div>Loading</div>
    if (isError) return (
        <>
            <p>Error</p>
            <div>{error.message}</div>
        </>
    )

    return (
        <>
            <h3 style={{ color: "blue" }}>Comments</h3>
            {data?.map(detail => {
                return (
                    <div key={detail.id}>
                        {detail.email} : {detail.body}
                        <br/>
                    </div>
                )
            })}
        </>
    )
}

export default PostDetail