/*
 * @Date: 2022-04-26 12:06:09
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 12:07:58
 * @FilePath: /my-first-app/plugins/persistedState.client.js
 */
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'nuxtFirstApp',
  })(store)
}
