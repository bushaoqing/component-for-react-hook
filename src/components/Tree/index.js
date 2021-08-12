import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Input from '../Input'
import Empty from '../Empty'

import './index.css'

function Tree(props) {
  let { showFilterInput, filterInputWidth, data, options, changeValue, inputPlaceholder, width } = props

  const [domainInputVal, setDomainInputVal] = useState('') // 模糊搜索值
  const [currentItem, setCurrentItem] = useState('')
  const [expendList, setExpendList] = useState([]) // 存放展开的组
  const [allTreeGroupList, setAllTreeGroupList] = useState([]) // 存储所有非叶子节点，用于模糊搜索展开分组使用

  useEffect(() => {

    // 展开所有的分组
    if (showFilterInput) {
      let curList = getCurList(data)
      setAllTreeGroupList(curList)
    }
  }, [showFilterInput, data])

  useEffect(() => {
    let arr = !domainInputVal ? [] : allTreeGroupList
    setExpendList(arr)
  }, [domainInputVal])

  function getCurList(data, list = []) {

    if (_.isArray(data) && data.length) {
      data.forEach(item => {
        if (item[options.children] && item[options.children].length) {
          list.push(item[options.label])

          if (item[options.children] && item[options.children].length) {
            let childList = getCurList(item[options.children], list)
            
            if (childList && childList.length) {
              list.push(...childList)
            }
          }
        }
      })
      return Array.from(new Set(list))
    }
  }

  function onGroupClick(group) {
    let curExpendList = _.cloneDeep(expendList)
    let index = curExpendList.indexOf(group[options.label])
    if (index !== -1) {
      curExpendList.splice(index, 1)
    } else {
      curExpendList.push(group[options.label])
    }

    setCurrentItem(group)
    setExpendList(curExpendList)
    changeValue(group)
  }

  function formatTreeDate(list, tree_level) {

    // 给每一项补充level, 给每一级设置paddingLeft使用的
    list = list.map(item => {
      item = {
        ...item,
        tree_level: tree_level
      }

      if (item[options.children] && item[options.children].length) {
        let index = tree_level + 1
        item[options.children] = formatTreeDate(item[options.children], index)
      }
      return item
    })
    return list
  }

  // 将叶子节点不是模糊搜索中的去除
  function filterTreeData(list) {
    let record = _.cloneDeep(list)
    record = record.map(item => {

      if (item[options.children] && item[options.children].length) {
        item[options.children] = filterTreeData(item[options.children]).filter(i => i)
        return item
      }
      
      if (item[options.label].indexOf(domainInputVal) > -1) {
        return item
      }
      return ''
    })
    return record
  }

  // 将非叶子节点且没有叶子元素的去除
  function onSplice(list) {
    let data = _.cloneDeep(list)

    // 倒序删除
    for (let j = data.length - 1; j >= 0; j--) {
      for (let i = j; i >= 0; i--) {
        let item = data[i];
        if (item && item[options.children]) {
          if (!item[options.children].length) {
            data.splice(i, 1)
          } else {
            item[options.children] = onSplice(item[options.children])
          }
        }
      }
    }
    return data
  }


  let treeData = formatTreeDate([...data], 0)

  // 过滤tree的数据
  if (showFilterInput) {
    treeData = filterTreeData(treeData)
    treeData = onSplice(treeData)
  }

  return (
    <div className="comp-tree-wrap" style={{ width }}>
      {
        showFilterInput &&
        <div style={{ marginBottom: 8 }}>
          <Input
            placeholder={inputPlaceholder}
            width={filterInputWidth}
            value={domainInputVal}
            onChange={val => setDomainInputVal(val)}
          />
        </div>
      }

      <div className="comp-tree__body-wrap">
        {
          !!treeData.length &&
          TreeItem(treeData, options, currentItem, expendList, onGroupClick)
        }
        {
          !treeData.length &&
          <Empty
            text={!!domainInputVal ? '暂无匹配项' : '暂无数据'}
            icon={!!domainInputVal ? 'noSearch' : 'noData'}
          />
        }
      </div>
    </div>
  )
}

Tree.propTypes = {
  filterInputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showFilterInput: PropTypes.bool,
  data: PropTypes.array,
  options: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  changeValue: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Tree.defaultProps = {
  showFilterInput: false,
  width: 340,
  data: [],
  options: {
    children: 'children',
    label: 'label'
  },
  inputPlaceholder: '请输入',
  changeValue: _.noop
}

export default Tree

function TreeItem (data, options, currentItem, expendList, onGroupClick) {
  return (
    !!data.length &&
    data.map((group, index) => {
      let hasChildren = !!group[options.children] && !!group[options.children].length
      return (
        <div key={index}>
          <div
            style={{
              paddingLeft: group.tree_level * 30
            }}
            className={
              'ellipsis' +
              (hasChildren ? ' group-has-children' : ' group-has-no-children') +
              (currentItem[options.label] === group[options.label] ? ' current' : '') +
              (!!group.customClass ? ` ${group.customClass}` : '') +
              (hasChildren && expendList.includes(group[options.label]) ? ' expend' : '')
            }
            onClick={() => onGroupClick(group)}
          >{group[options.label]}</div>

          {
            hasChildren &&
            expendList.includes(group[options.label]) &&
            TreeItem(group[options.children], options, currentItem, expendList, onGroupClick)
          }
        </div>
      )
    })
  )
}
