import isEmpty from 'lodash/isEmpty'
import { isRef } from 'vue-demi'

/**
 * 全局store
 * @type {Array}
 */
const stores = []

/**
 * 定义store
 * @param id 模块唯一标识
 * @param store  state用ref定义, getter用computed定义, action用function定义
 * @returns {function(): *}
 */
export function defineStore(id, store) {
  stores.push({ id })
  return () => {
    const index = stores.findIndex((store) => store.id === id)
    if (!stores[index].storeInstance) {
      stores[index].storeInstance = store()
    }
    return stores[index].storeInstance
  }
}

/**
 * 用于Options API 取state和getter的值
 * @param store 引用的store
 * @param states 要取的state或者getter， 支持array或者object
 *     不传： 全部取出来
 *     array：指定key值，
 *     object: {'old':'new'} 支持改名
 */
export function mapState(store, states) {
  const result = {}
  if (isEmpty(states)) {
    for (let [k, v] of Object.entries(store)) {
      if (isRef(v)) {
        result[k] = () => v.value
      }
    }
    return result
  }
  if (Array.isArray(states)) {
    states.forEach((i) => {
      const val = store[i]
      if (val && isRef(val)) {
        result[i] = () => val.value
      }
    })
    return result
  }
  if (Object.prototype.toString.call(states) === '[object Object]') {
    for (let [k, v] of Object.entries(states)) {
      const val = store[k]
      if (val && isRef(val)) {
        result[v] = () => val.value
      }
    }
    return result
  }
  return result
}

/**
 * 用于Options API 取actions值
 * @param store 引用的store
 * @param actions 要取的actions， 支持array或者object
 *     不传： 全部取出来
 *     array：指定key值，
 *     object: {'old':'new'} 支持改名
 */
export function mapActions(store, actions) {
  const result = {}
  if (isEmpty(actions)) {
    for (let [k, v] of Object.entries(store)) {
      if (!isRef(v) && typeof v === 'function') {
        result[k] = v
      }
    }
    return result
  }
  if (Array.isArray(actions)) {
    actions.forEach((i) => {
      const val = store[i]
      if (val && !isRef(val) && typeof val === 'function') {
        result[i] = val
      }
    })
    return result
  }
  if (Object.prototype.toString.call(actions) === '[object Object]') {
    for (let [k, v] of Object.entries(actions)) {
      const val = store[k]
      if (val && !isRef(val) && typeof val === 'function') {
        result[v] = val
      }
    }
    return result
  }
  return result
}

/**
 * 用于Options API 读写state属性
 * @param store 引用的store
 * @param states 要取的state或者getter， 支持array或者object
 *     不传： 全部取出来
 *     array：指定key值，
 *     object: {'old':'new'} 支持改名
 */
export function mapWritableState(store, states) {
  const result = {}
  if (isEmpty(states)) {
    for (let [k, v] of Object.entries(store)) {
      if (isRef(v)) {
        result[k] = {
          set(value) {
            v.value = value
          },
          get() {
            return v.value
          }
        }
      }
    }
    return result
  }
  if (Array.isArray(states)) {
    states.forEach((i) => {
      const val = store[i]
      if (val && isRef(val)) {
        result[i] = {
          set(value) {
            val.value = value
          },
          get() {
            return val.value
          }
        }
      }
    })
    return result
  }
  if (Object.prototype.toString.call(states) === '[object Object]') {
    for (let [k, v] of Object.entries(states)) {
      const val = store[k]
      if (val && isRef(val)) {
        result[v] = {
          set(value) {
            val.value = value
          },
          get() {
            return val.value
          }
        }
      }
    }
    return result
  }
  return result
}
