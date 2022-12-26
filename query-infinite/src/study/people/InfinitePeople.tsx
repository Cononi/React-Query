import { useInfiniteQuery } from "@tanstack/react-query"
import { Person } from "./Person";
import { CommonResponse } from "../commonResponse";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect } from "react";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

const InfinitePeople = () => {
    // fetchNextPage를 실행하면 next 프로퍼티가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다.
    // HasNextPage는 이 함수가 undefined를 반환하는지 아닌지에 다라 결정된다
    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery<CommonResponse, Error>(
        ["infinitePage"],
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined
        }
    )

    // 캐시된 데이터가 없을 때 로딩 처리
    if (isLoading) <div className="loading">로딩중</div>
    // 에러 처리
    if (isError) <div>{error.message}</div>

    // loadMore 추가로 데이터가 필요할 때
    return (
        <>
            {isFetching && <div className="loading">로딩중</div>}
            <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
                {data?.pages.map(pageData => {
                    return pageData.results.map((person) => {
                        return (
                            <Person
                                key={person.name}
                                name={person.name}
                                eyeColor={person.eye_color}
                                hairColor={person.hair_color}
                            />
                        )
                    })
                })} || <></>
            </InfiniteScroll>
        </>
    )
}


export default InfinitePeople