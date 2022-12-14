import types from './utils/type.js'
import utils from './utils/utils.js'
const PtApi = {
	host: '',
	port: 0,
	timeout: 0,
	err: 'err',
	success: 'success',
	connent: 'connent',
	close: 'close',
	mac: 'mac',
	sockhandle: 0
}
const Api = {
	main: () => {
		console.log(Api.PtApiEvent());
		console.log(Api.PtApiString());

	},
	/**
	 * @event {Function()} PtApiEvent 
	 */
	PtApiEvent: () => {
		var ip, mac, port, timeout, obj = {
			mac: '',
			ip: '',
		};
		// #ifdef APP
		var mainactivity = plus.android.runtimeMainActivity();
		var context = plus.android.importClass('android.content.Context');
		var wifiManager = mainactivity.getSystemService(context.WIFI_SERVICE)
		var d = plus.android.importClass('java.net.NetworkInterface')
		var wife = plus.android.importClass('android.net.wifi.WifiManager')
		var wifeinfo = plus.android.importClass('android.net.wifi.WifiInfo')
		wife = mainactivity.getSystemService(context.WIFI_SERVICE);
		var by = d.getByName('wlan0')
		wifeinfo = wife.getConnectionInfo()
		mac = by.getHardwareAddress();
		ip = wifeinfo.getIpAddress();
		ip = utils.toIp(ip);
		Api.setIp(ip)
		Api.setMac(utils.toMac(mac));
		obj.ip = ip;
		obj.mac = utils.toMac(mac);
		return obj;
		// #endif

	},
	/**
	 * @callback {Function()} setHost 
	 */
	setMac: (value) => {
		return PtApi.mac = value;
	},
	getMac: () => {
		if ((typeof eval('Api.setMac')) == 'function') {
			return Api.PtApiEvent().mac;
		}
		return;
	},
	/**
	 * @callback {Function()} setPort 
	 */
	setIp: (value) => {
		return PtApi.ip = value;
	},
	getIp: () => {
		if ((typeof eval('Api.setIp')) == 'function') {
			return Api.PtApiEvent().ip;
		}
	},
	
	/**
	 * @callback {Function()} setTimeOut 
	 */
	setTimeOut: (value) => {
		console.log(value)
		return value;
	},
	setSockHandle: (value) => {
		PtApi.sockhandle = value;
	},
	getSockHandle: () => {
		return PtApi.sockhandle;
	},
	PtApiString: () => {
		var a, b, c, d, f, e, g, h, j, k
		a = [0x1, 0x0, 0x0, 0x0];
		b = [0x0, 0x1, 0x0, 0x0];
		c = [0x0, 0x0, 0x1, 0x0];
		d = [0x0, 0x0, 0x0, 0x1];
		f = 'HTTP/1.1';
		e = 'METHOD:';
		j = 'GET';
		var a = uni.arrayBufferToBase64(a);
		var b = uni.arrayBufferToBase64(b);
		var c = uni.arrayBufferToBase64(c);
		var d = uni.arrayBufferToBase64(d);
		if (!types.isString(a)) return false;
		g = utils.tocharCodeAt(f);
		h = utils.tocharCodeAt(e);
		k = utils.tocharCodeAt(j);
		var data = {
			a,
			b,
			c,
			d,
			g,
			h,
			k,
		}
		return data;
	},
	getFileData: () => {
		// ????????????????????????????????????????????????????????????????????????????????????
		var self = this;
		plus.io.requestFileSystem(
			plus.io.PUBLIC_DOCUMENTS, // ??????????????????????????????
			fs => {
				console.log(JSON.parse(JSON.stringify(fs.root)))
				// ?????????????????????, fs.root????????????????????????,??????fs????????????????????????
				fs.root.getFile('/storage/emulated/0/config.json', {
					create: false // ????????????????????????
				}, fileEntry => {

					// ???????????????????????????	
					fileEntry.createWriter(writer => {
						writer.onwrite = function(e) {
							console.log("Write data success!");
						}
						// Write data to the end of file.
						// writer.seek(1); //????????????????????????
						let DataString = JSON.stringify(self.serverURL)
						console.log(DataString)
						writer.write(DataString); //??????????????????????????????????????????????????????

					}, function(e) {
						console.log('????????????')
					})
				});
			},
			e => {
				console.log(e.message);
			}
		);
	}
}
export default {
	Api
}
