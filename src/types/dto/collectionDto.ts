import { SortFilter } from "src/types/enums/sortFilters";


export type collectionRequestsDto = {
    page?: number;
    limit?: number;
    sortBy: SortFilter
}
