import { MatchResult } from "path-to-regexp";

export default function SearchPage ({ routeParams }: { routeParams: MatchResult<object> }) {
    return (
        <h1>Search: {routeParams.query}</h1>
    )
}