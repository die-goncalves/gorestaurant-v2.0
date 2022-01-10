function restaurantSituation(
  dailyOperation:
    | Array<{
        start_hour: string
        end_hour: string
        weekday: string
      }>
    | undefined,
  currentTime: string
) {
  if (dailyOperation === undefined) {
    return { open: false }
  }

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
    weekday: string
  }>
) {
  const separateDaysOfTheWeek = operating_hours.reduce<
    Record<
      string,
      Array<{
        id: string
        start_hour: string
        end_hour: string
        weekday: string
      }>
    >
  >((acc, element) => {
    const day = acc[element.weekday] ?? []
    day.push(element)
    day.sort(function (a, b) {
      if (a.start_hour > b.start_hour) return 1
      if (a.start_hour < b.start_hour) return -1
      return 0
    })
    return {
      ...acc,
      [element.weekday]: day
    }
  }, {})

  return { separateDaysOfTheWeek }
}

export function whenOpen(
  operating_hours: Array<{
    id: string
    start_hour: string
    end_hour: string
    weekday: string
  }>,
  time: { day: number; timer: string }
) {
  enum weekday {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
  }

  const timeOrdering = operating_hours.reduce<
    Record<
      string,
      Array<{
        id: string
        start_hour: string
        end_hour: string
        weekday: string
      }>
    >
  >((acc, element) => {
    const day = acc[element.weekday] ?? []
    day.push(element)
    day.sort(function (a, b) {
      if (a.start_hour > b.start_hour) return 1
      if (a.start_hour < b.start_hour) return -1
      return 0
    })
    return {
      ...acc,
      [element.weekday]: day
    }
  }, {})

  let countDay = time.day

  let isOpen = {} as { open: boolean; for_coming?: any; current?: any }
  while (true) {
    if (countDay !== time.day) {
      if (
        timeOrdering[weekday[countDay]] &&
        timeOrdering[weekday[countDay]].length > 0
      ) {
        isOpen = {
          open: false,
          for_coming: timeOrdering[weekday[countDay]][0]
        }
        break
      }
    }
    isOpen = restaurantSituation(timeOrdering[weekday[countDay]], time.timer)
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
