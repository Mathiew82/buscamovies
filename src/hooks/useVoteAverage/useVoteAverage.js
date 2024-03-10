const useVoteAverage = (voteAverage) => {
  const getVoteAverageInteger = (value) => {
    return value * 10
  }

  return getVoteAverageInteger(voteAverage).toFixed(0)
}

export default useVoteAverage
