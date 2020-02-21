import Config from '@/config'
import axios from 'axios'

export default {
  openLoading () {
    window.loading = window.vueRoot.$loading({
      lock: true,
      text: 'Loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(250, 250, 250, 0.7)'
    })
  },
  closeLoading () {
    window.loading.close()
  },

  async get (route) {
    this.openLoading()
    try {
      var response =
          await axios.get(`https://${Config.apiDest.host}/api${route}`)
    } catch (err) {
      console.log(err)
      this.closeLoading()
      window.vueRoot.$message({
        showClose: true,
        message: 'Request failed!',
        type: 'error'
      })
      return
    }
    this.closeLoading()
    if (response.status === 200) {
      return response.data
    }
  },
  async post (route, data) {
    this.openLoading()
    try {
      var response =
          await axios.post(`https://${Config.apiDest.host}/api${route}`, data)
    } catch (err) {
      console.log(err)
      this.closeLoading()
      window.vueRoot.$message({
        showClose: true,
        message: 'Request failed!',
        type: 'error'
      })
      return
    }
    this.closeLoading()
    return response.data
  }
}
