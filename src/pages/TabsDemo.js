import React from 'react'
import Tabs from '../components/Tabs'

import AAA from './LoadingDemo'
import BBB from './FormDemo'
import CCC from './LayoutDemo'
import DDD from './MessageDemo'

const menu = [
  {
    title: 'AAA',
    path: '/AAA',
    component: AAA
  }, {
    title: 'BBB',
    path: '/BBB',
    component: BBB
  }, {
    title: 'CCC',
    path: '/CCC',
    component: CCC
  }, {
    title: 'DDD',
    path: '/DDD',
    component: DDD
  }
]

const TabsDemo = () => (
  <Tabs 
    menu={menu}
  />
)

export default TabsDemo