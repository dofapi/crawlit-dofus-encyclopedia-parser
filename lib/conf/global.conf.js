import dofusConf from './games-conf/dofus-items.conf';
import dofusTouchConf from './games-conf/dofus-touch-items.conf';
import wakfuConf from './games-conf/wakfu-items.conf';
import wavenConf from './games-conf/waven-items.conf';

import dofusListUrl from './games-list-url/dofus-list-url';
import dofusTouchListUrl from './games-list-url/dofus-touch-list-url';
import wakfuListUrl from './games-list-url/wakfu-list-url';
import wavenListUrl from './games-list-url/waven-list-url';

/**
 * @type {{games: {"dofus-touch": {languages: {english: urlSwitcherEn, french: urlSwitcherFr}, active: boolean, conf: {categories}}, wakfu: {languages: {english: urlSwitcherEn, french: urlSwitcherFr}, active: boolean, conf: {categories}}, dofus: {languages: {english: urlSwitcherEn, french: urlSwitcherFr}, active: boolean, conf: {categories}}, waven: {languages: {english: urlSwitcherEn, french: urlSwitcherFr}, active: boolean, conf: {categories}}}}}
 */
const gamesConf = {
	'games': {
		'dofus': {
			'conf': dofusConf,
			'active': true,
			'languages': {
				'french': dofusListUrl.urlSwitcherFr,
				'english': dofusListUrl.urlSwitcherEn
			}
		},
		'dofus-touch': {
			'conf': dofusTouchConf,
			'active': true,
			'languages': {
				'french': dofusTouchListUrl.urlSwitcherFr,
				'english': dofusTouchListUrl.urlSwitcherEn
			}
		},
		'wakfu': {
			'conf': wakfuConf,
			'active': false,
			'languages': {
				'french': wakfuListUrl.urlSwitcherFr,
				'english': wakfuListUrl.urlSwitcherEn
			}
		},
		'waven': {
			'conf': wavenConf,
			'active': false,
			'languages': {
				'french': wavenListUrl.urlSwitcherFr,
				'english': wavenListUrl.urlSwitcherEn
			}
		},
	},
};

export default gamesConf;