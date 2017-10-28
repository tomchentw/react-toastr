const _ = require("lodash")
const path = require("path")

module.exports = {
  require: ["animate.css", "toastr/build/toastr.min.css"],
  showUsage: true,
  showCode: true,
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, ".jsx")
    if (name === "ToastMessagejQuery") {
      return `import ${name} from "react-toastr/lib/components/ToastMessage/ToastMessagejQuery";`
    }
    return `import { ${name} } from "react-toastr";`
  },
}
