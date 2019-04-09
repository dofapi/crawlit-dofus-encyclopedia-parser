import dofusConf from './games-conf/dofus-items.conf';
import dofusTouchConf from './games-conf/dofus-touch-items.conf';
import wakfuConf from './games-conf/wakfu-items.conf';
import wavenConf from './games-conf/waven-items.conf';

import dofusListUrl from './games-list-url/dofus-list-url';
import dofusTouchListUrl from './games-list-url/dofus-touch-list-url';
import wakfuListUrl from './games-list-url/wakfu-list-url';
import wavenListUrl from './games-list-url/waven-list-url';

const gamesConf = {
	'games': [
		{
			'key': 'dofus',
			'conf': dofusConf,
			'languages': {
				'french': dofusListUrl.urlSwitcherFr,
				'english': dofusListUrl.urlSwitcherEn
			}
		},
		{
			'key': 'dofus-touch',
			'conf': dofusTouchConf,
			'languages': {
				'french': dofusTouchListUrl.urlSwitcherFr,
				'english': dofusTouchListUrl.urlSwitcherEn
			}
		},
		{
			'key': 'wakfu',
			'conf': wakfuConf,
			'languages': {
				'french': wakfuListUrl.urlSwitcherFr,
				'english': wakfuListUrl.urlSwitcherEn
			}
		},
		{
			'key': 'waven',
			'conf': wavenConf,
			'languages': {
				'french': wavenListUrl.urlSwitcherFr,
				'english': wavenListUrl.urlSwitcherEn
			}
		}
	]
};

export default gamesConf;