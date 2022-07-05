/**
 * 提供mockjs數據接口
 */
import Mock from 'mockjs'
import data from './data.json'

//返回goods的接口
Mock.mock('/mock/goods', { code: 0, data: data.goods })

//返回ratings的接口
Mock.mock('/mock/ratings', { code: 0, data: data.ratings })

//返回info的接口
Mock.mock('/mock/info', { code: 0, data: data.info })

//json數據是默認暴露的,所以不需要向外暴露數據