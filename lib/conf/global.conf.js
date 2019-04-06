import dofusConf from './games-conf/dofus-items.conf';
import dofusTouchConf from './games-conf/dofus-touch-items.conf';
import wakfuConf from './games-conf/wakfu-items.conf';
import wavenConf from './games-conf/waven-items.conf';

export default {
	'games': [
		{
			'key': 'dofus',
			'conf': dofusConf
		},
		{
			'key': 'dofus-touch',
			'conf': dofusTouchConf
		},
		{
			'key': 'wakfu',
			'conf': wakfuConf
		},
		{
			'key': 'waven',
			'conf': wavenConf
		}
	]
};