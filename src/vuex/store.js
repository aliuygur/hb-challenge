import Vue from 'vue'
import Vuex from 'vuex'
import { LinkLocalStorageRepo } from '../repos.js'
import { LinkService } from '../services.js'

const linkService = new LinkService(new LinkLocalStorageRepo())

Vue.use(Vuex)

const state = {
  newLink: {
    title: null,
    link: null
  },
  links: [],
  notifySuccess: null
}

const mutations = {
  ADD_LINK(state, link) {
    state.links.push(link)
  },
  FETCH_LINKS(state, links) {
    state.links = links
  },
  REMOVE_LINK(state, id) {
    let i = state.links.findIndex(link => id === link.id)
    if(i != -1) {
      state.links.splice(i, 1)
    }
  },
  NOTIFY_SUCCESS(state, msg) {
    state.notifySuccess = msg
    // reset the variable after n seconds, autoclose
    setTimeout(() => {
      state.notifySuccess = null
    }, 3000)
  }
}

const getters = {
  links(state) {
    return state.links.sort((a, b) => b.createdAt - a.createdAt)
  },
  linksLessVoted(state) {
    return state.links.sort((a, b) => a.votes - b.votes)
  },
  linksMostVoted(state) {
    return state.links.sort((a, b) => b.votes - a.votes)
  },
  notifySuccess(state) {
    return state.notifySuccess
  }
}

const actions = {
  ADD_LINK({ commit }, payload) {
    return linkService.add(payload.title, payload.link).then(link => {
      commit('ADD_LINK', link)
      return link
    })
  },
  FETCH_LINKS({ commit }) {
    return linkService.fetch().then(links => {
      commit('FETCH_LINKS', links)
    })
  },
  UPDATE_LINK({ commit }, payload) {
    return linkService.update(payload.id, payload)
  },
  REMOVE_LINK({commit}, id) {
    return linkService.remove(id)
      .then(() => {
        commit('REMOVE_LINK', id)
      })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})