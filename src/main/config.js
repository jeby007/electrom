import fs from 'fs-extra'
import { remote, app } from 'electron'



const config = {

	//外壳更新域名
	// updateDomain: 'http://192.168.6.89:8094/download/',
	updateDomain: 'http://ciie.i-sgm.cn/app/',

	//获取exe文件所在目录
	getRootPath: function() {
		let execPath = process.execPath;
		this.app_root = execPath.substring(0, execPath.lastIndexOf('\\'));
	},

	//获取用户机器AppData目录
	getDataPath: function() {
		let APP = process.type === 'renderer' ? remote.app : app
		let STORE_PATH = APP.getPath('userData')

		if (process.type !== 'renderer') {
		  if (!fs.pathExistsSync(STORE_PATH)) {
		    fs.mkdirpSync(STORE_PATH)
		  }
		}
		this.app_root = STORE_PATH;
	}
}

export default config
