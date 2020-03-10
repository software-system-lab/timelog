import html from './header.js'
import FileSaver from 'file-saver'

export default {
  exportHTML (element) {
    console.log(element)
    const completeHTML = html(element.outerHTML)
    var blob = new Blob([completeHTML], {type: "text/plain;charset=utf-8"})
    FileSaver.saveAs(blob, 'output.html')
    console.log(completeHTML);
  },

  exportSVG (element) {
    const content = element.outerHTML
    const sub = content.substring(content.indexOf("<svg"), content.indexOf("</svg>")+6)
    var blob = new Blob([sub], {type: "text/plain;charset=utf-8"})
    FileSaver.saveAs(blob, 'output.svg')
    console.log(sub)
  }
}
