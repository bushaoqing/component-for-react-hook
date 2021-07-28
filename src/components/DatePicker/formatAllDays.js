export function getAllDays (year, month, dateValue, showDateRangePickePage) {
  year = typeof Number(year) === 'number' ? +year : new Date().getFullYear()
  month = (
    typeof Number(month) === 'number' && ([0,1,2,3,4,5,6,7,8,9,10,11].includes(month))
  ) ? +month : new Date().getMonth()

  let allDays = []

  let theFirstDay = new Date(year, month, 1).getDay()
  let beforeFirstDay = new Date(year, month, 0).getDate()
  let theLastDay = new Date(year,month + 1,0).getDate()

  for (let i = theFirstDay - 1; i >= 0; i--, beforeFirstDay--) {
    allDays[i] = {
      num: beforeFirstDay,
      value: [month == 0 ? year - 1 : year, PrefixMonthInteger(month, 2), PrefixInteger(beforeFirstDay, 2)],
      colorClass: 'gray'
    }
  }

  for (let i = theFirstDay, j = 1; i < (theLastDay + theFirstDay); i++, j++) {
    allDays[i] = {
      num: j,
      value: [year, PrefixMonthInteger(month+1, 2), PrefixInteger(j, 2)],
      colorClass: (isCurrentChiose(year, month+1, j, dateValue, showDateRangePickePage) ? ' current ' : ((
        year === new Date().getFullYear() &&
        month === new Date().getMonth() &&
        j === new Date().getDate()
      ) ? ' today ' : ''))
      + getCheckedDaysClass(year, month+1, j, dateValue, showDateRangePickePage)
    }
  }
  
  for (let i = allDays.length, k = 1; i < 7 * 6; i++, k++) {
    allDays[i] = {
      num: k,
      value: [month == 11 ? year + 1 : year, PrefixMonthInteger(month+2, 2), PrefixInteger(k, 2)],
      colorClass: 'gray'
    }
  }

  return allDays
}


export function PrefixMonthInteger(num, length) {
  num = num % 12 === 0 ? 12 : num % 12
  return (Array(length).join('0') + num).slice(-length);
}

export function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

function isCurrentChiose(y, m, d, list, showDateRangePickePage) {
  if (showDateRangePickePage && Array.isArray(list) && Array.isArray(list[0]) && Array.isArray(list[1])) {
    return list.some(item => y == item[0] && m == item[1] && d == item[2])
  } else {
    return list.some(item => y == item[0] && m == item[1] && d == item[2])
  }
}

function getCheckedDaysClass(y, m, d, list, showDateRangePickePage) {
  if (showDateRangePickePage && Array.isArray(list) && Array.isArray(list[0]) && Array.isArray(list[1])) {
    if (new Date(y, m-1, d) > new Date(list[0]) && new Date(y, m-1, d) < new Date(list[1])) {
      return ' range__in'
    } else if (+new Date(y, m-1, d) === +new Date(list[0])) {
      return ' min__date'
    } else if (+new Date(y, m-1, d) === +new Date(list[1])) {
      return ' max__date'
    }
  } else {
    return ''
  }
}
