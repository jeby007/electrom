const ipcMain = require('electron').ipcMain;
const app = require('electron').app;
const dialog = require('electron').dialog;
import config from '../config'
const url = require('url');
const path = require('path');
import menus from './menus'
import AutoUpdateApp from '../util/AutoUpdateApp'
import log4js from './log-config'



const logger = log4js.getLogger();

const listening = {

	start(mainWindow) {
		config.getDataPath();
		this.updateApp(mainWindow);
		this.closeWindow(mainWindow);
	},

	/**
	* APP 更新
			1、获取当前登录用户信息
			2、如果用户未登录，自动更新
			3、如果用户已登录在配置经销商中，自动更新
	*/
	updateApp (mainWindow) {
		ipcMain.on('autoupdate:app:check', (e, arg) => {
			//调用大通接口，查看当前经销商是否需要升级外壳
			logger.error('检测更新外壳, feedUrl = ', feedUrl);
			let feedUrl = config.updateDomain;
			AutoUpdateApp.checkForUpdates(mainWindow, feedUrl);
		});
	},

	//关闭窗口
	closeWindow(mainWindow) {

		//监听关闭行为
		mainWindow.on('close', (event) => {
			if (config.closeWind) {
				mainWindow.webContents.send('window:close');
				//阻塞当前关闭行为
				event.preventDefault();
			}
		});

		//监听关闭结果
		//监听是否关闭浏览器
		ipcMain.on('window:close:result', (e, data) => {
			if (data == 1) {
				mainWindow = null;
      			app.exit();
			}
		});
	}

}

export default listening
