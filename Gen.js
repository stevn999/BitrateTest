  function random(min = 0, max = 1, int = false) {
    res = 0
    if (Array.isArray(min)) {
      return min[Math.floor(Math.random() * min.length)]
    } else {
      res = Math.random() * (max - min) + min
      if (int == true) {
        return Math.round(res)
      } else {
        return res
      }
    }
}
