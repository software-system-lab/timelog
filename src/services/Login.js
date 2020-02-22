import $ from 'jquery'
import _profileService from './ProfileService.js'

export async function afterLogin () {
  window.authorized = true

  // Get user Profile
  window.Profile = await _profileService.GetProfile()
  $('.el-icon-loading').hide()

  if (window.tempNextPath === undefined) {
    window.tempNextPath = '/Board'
  }
}
