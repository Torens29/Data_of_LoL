export function findCommonMatches(
    player1Matches: string[],
    player2Matches: string[]
): string[] {
    const player1MatchSet = new Set(player1Matches);

    const commonMatches = player2Matches.filter((matchId) =>
        player1MatchSet.has(matchId)
    );

    return commonMatches;
}
