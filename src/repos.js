// this file contains repositories
import uuid from 'uuid4'

/**
 * local storage repository
 */
export class LinkLocalStorageRepo {
  constructor() {
    // check for local storage support
    try {
      localStorage.setItem('test', 'test value')
      localStorage.removeItem('test')
    } catch (e) {
      throw new Error('this browser does not support for local storage')
    }
    
    this.table = 'hb-links';
  }

  /**
   * returns all records from db
   */
  fetch() {
    return Promise.resolve(JSON.parse(localStorage.getItem(this.table) || '[]'))
  }

  /**
   * saves all links
   * 
   * @param {array} links 
   */
  add(link) {
    const now = Date.now()
    link.id = uuid()
    link.createdAt = now
    link.updatedAt = now
    link.votes = 0

    return this.fetch().then(links => {
      links.push(link)
      localStorage.setItem(this.table, JSON.stringify(links))
      return link
    })
  }

  /**
   * updates record at db
   * 
   * @param {string} id entity's id
   * @param {object} payload updated data 
   */
  update(id, payload) {
    return this.fetch()
      .then(links => {
        let i = links.findIndex(link => id === link.id)
        if (i === -1) {
          throw new Error('record not found')
        }
        Object.assign(links[i], payload)
        localStorage.setItem(this.table, JSON.stringify(links))
        return links[i]
      })
  }

  /**
   * removes record from db
   * @param {string} id record's id
   */
  remove(id) {
    return this.fetch()
      .then(links => {
        let i = links.findIndex(link => id === link.id)
        if (i === -1) {
          throw new Error('record not found')
        }
        links.splice(i, 1)
        localStorage.setItem(this.table, JSON.stringify(links))
      })
  }
}