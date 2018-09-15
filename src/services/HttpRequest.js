import axios from 'axios';

export default {
  openLoading() {
    window.loading = window.vueRoot.$loading({
      lock: true,
      text: 'Loading...',
      spinner: 'el-icon-loading',
      background: 'rgba(250, 250, 250, 0.7)'
    });
  },
  closeLoading() {
    window.loading.close();
  },
  async get(api) {
    this.openLoading();
    try {
      var response = await axios.get(api);
    } catch (err) {
      console.log(err);
      this.closeLoading();
      vueRoot.$message({
        showClose: true,
        message: 'Request failed!',
        type: 'error'
      });
      return;
    }

    this.closeLoading();
    if (response.statusText == "OK")
      return response.data;

    return;
    // var response = await HTTP.get(`api/NurseExecutionDoctorOrders/InpatientList/queryPaitentInfo?inpatientEncounterId=${encodeURIComponent(inpatientEncounterId)}`, config); return response.data;
  },
  async post(api, data) {
    this.openLoading();
    try {
      var response = await axios.post(api,data);
    } catch (err) {
      console.log(err);
      this.closeLoading();
      vueRoot.$message({
        showClose: true,
        message: 'Request failed!',
        type: 'error'
      });
      return;
    }

    this.closeLoading();
    return response.data;
  }
}
