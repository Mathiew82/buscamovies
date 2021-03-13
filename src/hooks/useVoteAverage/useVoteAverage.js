const useVoteAverage = (voteAverage) => {
  const getVoteAverageInteger = (value) => {
    return value * 10
  }

  return getVoteAverageInteger(voteAverage)
}

export default useVoteAverage
