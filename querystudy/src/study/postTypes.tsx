export interface PostData {
    userId: number
    id: number
    title: string
    body?: string
}

export interface PostDetailData {
    postId : number
    id : number
    name : string
    email : string
    body : string
}

export interface PostDetailProps {
    post : PostData
}