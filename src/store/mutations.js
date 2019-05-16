import {RECEIVE_LIST, MOVIES_ARR} from './mutation-type'

export default {
  [RECEIVE_LIST](state, data){
    state.listTmp = data
    console.log(state);
  },
  [MOVIES_ARR](state, data){
    state.moviesArr = data
    console.log(state);
  }
  
}
