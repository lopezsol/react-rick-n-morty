export interface ApiInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface ApiResponse<T> {
    info: ApiInfo;
    results: T[];
}
