import dofusConf from './games-conf/dofus-items.conf';
import dofusTouchConf from './games-conf/dofus-touch-items.conf';
import wakfuConf from './games-conf/wakfu-items.conf';
import wavenConf from './games-conf/waven-items.conf';

import dofusListUrl from '../modules/command-line/conf/games-list-url/dofus-list-url';
import dofusTouchListUrl from '../modules/command-line/conf/games-list-url/dofus-touch-list-url';
import wakfuListUrl from '../modules/command-line/conf/games-list-url/wakfu-list-url';
import wavenListUrl from '../modules/command-line/conf/games-list-url/waven-list-url';

export default {
	'games': [
		{
			'key': 'dofus',
			'conf': dofusConf,
			'listUrl': dofusListUrl
		},
		{
			'key': 'dofus-touch',
			'conf': dofusTouchConf,
			'listUrl': dofusTouchListUrl
		},
		{
			'key': 'wakfu',
			'conf': wakfuConf,
			'listUrl': wakfuListUrl
		},
		{
			'key': 'waven',
			'conf': wavenConf,
			'listUrl': wavenListUrl
		}
	]
};