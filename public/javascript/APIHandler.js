class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl
  }

  async getFullList() {
    try {
      const response = await axios({
        method: "GET",
        url: "/characters",
        baseURL: this.BASE_URL,
      })
      return response.data
    } catch (err) {console.log({err})}
  }

  async getOneRegister(id) {
    try {
      const response = await axios({
        method: "GET",
        url: "/characters/" + id,
        baseURL: this.BASE_URL,
      })
      return response.data
    } catch (err) {console.log({err})}
  }

  async createOneRegister(character) {
    try {
      const response = await axios({
        method: "POST",
        url: "/characters/",
        baseURL: this.BASE_URL,
        data: character,
      })
      return response.data
    } catch (err) {
      console.log({err});
    }
  }

  async updateOneRegister(id, character) {
    try {
      const response = await axios({
        method: "PATCH",
        url: "/characters/" + id,
        baseURL: this.BASE_URL,
        data: character,
      })
      return response.data
    } catch (err) {console.log({err})}
  }

  async deleteOneRegister(id) {
    try {
      const response = await axios({
        method: "DELETE",
        url: "/characters/" + id,
        baseURL: this.BASE_URL,
      })
      return response
    } catch (err) {console.log({err})}
  }
}
