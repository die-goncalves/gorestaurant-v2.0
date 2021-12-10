function restaurantSituation(
  dailyOperation: Array<{
    start_hour: string
    end_hour: string
    weekday: {
      id: number
      name: string
    }
  }>,
  currentTime: string
) {
  let dailySituation = {} as { open: boolean; for_coming?: any; current?: any }
  let start, end
  for (let i = 0; i < dailyOperation.length; i++) {
    start = dailyOperation[i].start_hour
    end = dailyOperation[i].end_hour

    if (currentTime < start) {
      if (!dailySituation.open) {
        dailySituation = {
          ...dailySituation,
          open: false,
          for_coming: dailyOperation[i]
        }
        return dailySituation
      }
    }
    if (currentTime > end) {
      dailySituation = { open: false }
    }
    if (currentTime >= start && currentTime <= end) {
      dailySituation = { open: true, current: dailyOperation[i] }
    }
  }
  return dailySituation
}

export function orderTime(
  operating_hours: Array<{
    id: string
    start_hour: string
    end_hour: string
    weekday: {
      id: number
      name: string
    }
  }>
) {
  let separateDaysOfTheWeek = Array.from(
    Array<{
      id: string
      start_hour: string
      end_hour: string
      weekday: {
        id: number
        name: string
      }
    }>(7),
    () =>
      new Array<{
        id: string
        start_hour: string
        end_hour: string
        weekday: {
          id: number
          name: string
        }
      }>()
  )
  operating_hours.forEach(item => {
    separateDaysOfTheWeek[item.weekday.id].push(item)
  })

  let timeOrdering = separateDaysOfTheWeek.map(day => {
    if (day.length === 0) return day
    return day.sort(function (a, b) {
      if (a.start_hour > b.start_hour) return 1
      if (a.start_hour < b.start_hour) return -1
      return 0
    })
  })

  return { timeOrdering }
}

export function whenOpen(
  operating_hours: Array<{
    start_hour: string
    end_hour: string
    weekday: {
      id: number
      name: string
    }
  }>,
  time: { day: number; timer: string }
) {
  let separateDaysOfTheWeek = Array.from(Array(7), () => new Array())
  operating_hours.forEach(item => {
    separateDaysOfTheWeek[item.weekday.id].push(item)
  })

  let timeOrdering = separateDaysOfTheWeek.map(day => {
    if (day.length === 0) return day
    return day.sort(function (a, b) {
      if (a.start_hour > b.start_hour) return 1
      if (a.start_hour < b.start_hour) return -1
      return 0
    })
  })

  let countDay = time.day
  let isOpen = {} as { open: boolean; for_coming?: any; current?: any }
  while (true) {
    if (countDay !== time.day) {
      if (timeOrdering[countDay].length > 0) {
        isOpen = { open: false, for_coming: timeOrdering[countDay][0] }
        break
      }
    }
    isOpen = restaurantSituation(timeOrdering[countDay], time.timer)

    if (isOpen.for_coming || isOpen.current) {
      break
    }

    countDay++
    if (countDay === 7) {
      countDay = 0
    }
    if (countDay === time.day) {
      break
    }
  }

  return isOpen
}
