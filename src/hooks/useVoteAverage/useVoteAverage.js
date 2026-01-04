const useVoteAverage = (voteAverage) => {
  if (!voteAverage) return 0

  const getVoteAverageInteger = (value) => {
    return value * 10
  }

  return getVoteAverageInteger(voteAverage).toFixed(0)
}

export default useVoteAverage
