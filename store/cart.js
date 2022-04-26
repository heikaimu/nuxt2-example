/*
 * @Date: 2022-04-22 11:29:33
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-04-26 11:13:48
 * @FilePath: /my-first-app/store/cart.js
 */
const types = {
  ADD_TO_CART: 'ADD_TO_CART',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY'
}

const state = () => {
  return {
    list: []
  }
}

const mutations = {
  [types.ADD_TO_CART](state, newProduct) {
    const curProduct = state.list.find(item => item.id === newProduct.id);
    if (curProduct) {
      curProduct.quantity += 1;
    } else {
      state.list.unshift({
        ...newProduct,
        quantity: 1
      });
    }
  },

  [types.DELETE_PRODUCT](state, id) {
    const index = state.list.findIndex(item => item.id === id);
    if (index > -1) {
      state.list.splice(index, 1);
    }
  },

  [types.UPDATE_QUANTITY](state, params) {
    const curProduct = state.list.find(item => item.id === params.id);
    if (curProduct) {
      curProduct.quantity = params.quantity;
    }
  }
}

const actions = {
  addToCart({ commit }, item) {
    console.log(11)
    commit(types.ADD_TO_CART, item);
  },

  setProductQuantity({ commit }, params) {
    if (params.quantity <= 0) {
      commit(types.DELETE_PRODUCT, params.id);
    } else {
      commit(types.UPDATE_QUANTITY, params);
    }
  }
}

export {
  state,
  mutations,
  actions
}
