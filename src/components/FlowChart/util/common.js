export const Position = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
}

/**
 * 通过div，计算其上右下左4个点的偏移量（left,top）
 * @param {Array} record div数组
 * @param {String} id path对应的div的ID
 * @param {String} position path对应的div的上右下左哪个点
 * @returns {Array} 一个点的坐标【x,y】
 */
export function getPosition(record, id, position) {
  let x = 0, y=0
  let curRecord = record.filter(i => i.id === id)[0]

  if (!curRecord) {
    return false // 表明并无此id对应的div
  }

  let curStyle = curRecord.style || {}
  let { left, top, width, height } = curStyle

  switch (position) {
    case Position.top:
      x = left + width / 2
      y = top
      break;

    case Position.right:
      x = left + width
      y = top + height / 2
      break;

    case Position.bottom:
      x = left + width / 2
      y = top + height
      break;

    case Position.left:
      x = left
      y = top + height / 2
      break;
  
    default:
      break;
  }

  return [x, y]
}