// import {LIST_TMP} from './mutation-type'
import listData from '../datas/list-data'
export const getListTmp = ({commit}) => {//获取数据列表
    console.log("actions");
    commit('getListTmp',listData)
}
