import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, type RefCallback } from "react";

import { rqClient } from "@/shared/openapi/instance";
import type { BoardSortOptions } from "@/shared/types";

type useBoardsListParams = {
    limit?: number;
    isFavorite?: boolean;
    search?: string;
    sort?: BoardSortOptions;
}

export function useBoardsList(
    {isFavorite, limit =20, search, sort}: useBoardsListParams)
    {
        const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } = rqClient.useInfiniteQuery('get', "/boards", 
        {
            params: {
                query: {
                    page: 1,
                    isFavorite,
                    limit, 
                    search,
                    sort
                }
            }
        },
        {
            initialPageParam: 1,
            pageParamName: "page",
            getNextPageParam: (lastPage: {totalPages: number}, _: number, lastPageParams: number) =>
                Number(lastPageParams) < lastPage.totalPages 
                ? (Number(lastPageParams) + 1)
                : null,
            
            placeholder: keepPreviousData
        }
    )

    const cursorRef: RefCallback<HTMLDivElement> = useCallback((el) => {
        if (!el) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                   fetchNextPage();
                }
            },
            { threshold: 0.5 },
        )

        observer.observe(el);
            
        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage])

    const boards = data?.pages.flatMap(page => page.list) ?? []

    return {
        boards,
        cursorRef,
        isFetchingNextPage,
        isLoadingBoardsList: isPending,
        hasNextPage,
        isPending
    }
}