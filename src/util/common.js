// 公共方法
import _ from 'lodash'

export function validateTrim(val) {
  return !!_.trim(val)
}

export function minLength(val, number) {
  return _.trim(val).length >= number
}