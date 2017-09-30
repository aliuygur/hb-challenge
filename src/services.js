// this file contains services

import { Link } from './models.js'
import uuid from 'uuid4'

/**
 * link service
 * this class depends a Repository
 */
export class LinkService {
  constructor(repo) {
    this.links = repo
  }

  /**
   * fetch all records from db then maps them to model
   * @return {Promise}
   */
  fetch() {
    let result = []
    return this.links.fetch().then(links => {
      links.forEach(link => {
        let model = new Link()
        Object.assign(model, link)
        result.push(model)
      })
      return result
    })
  }

  /**
   * adds a record to db
   * @param {string} title 
   * @param {string} link
   * @return {Promise} 
   */
  add(title, link) {
    let model = new Link()
    model.title = title
    model.link = link
    return this.links.add(model)
  }

  /**
   * updates a record 
   * @param {string} id 
   * @param {object} payload the data that will updated
   */
  update(id, payload) {
    return this.links.update(payload.id, payload)
      .then(link => {
        let model = new Link()
        Object.assign(model, link)
        return model
      })
  }

  /**
   * removes a record
   * @param {string} id 
   */
  remove(id) {
    return this.links.remove(id)
  }
}