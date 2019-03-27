
# <a href="url"><img src="https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/crawlit.png" align="left" height="50" width="50" ></a>Crawlit - Dofus & Dofus-Touch encyclopedia parser - Build your own Dofus API 
[![sosnoob](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/buildwithlove.png)](https://www.sosnoob.com)
[![sosnoob](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/buymecoffee.png)](https://www.paypal.me/sosnoob)

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Get+all+Dofus+%26+Dofus-Touch+encyclopedia+in+one+click+%21+Use+data+provided+by+the+tool+to+create+your+apps+and+APIs+%3AD&url=https://github.com/raczak/crawlit-dofus-encyclopedia-parser&via=sosnoobi&hashtags=sosnoob,DOFUSTouch,dofusbook,DOFUS,developers)

In order to respond to a need expressed by the community, I create an encyclopedia parser for `Dofus` available for : </br>
- `Windows`
- `OSX` 
- `Linux`

**Download** : [All versions are available here](https://github.com/raczak/crawlit-dofus-encyclopedia-parser/releases)


**:warning: Because of new parsing method : 429 error limitation removed, You can  parse as long as you want**

Crawlit was built to be very light, it can run on almost every configurations.

In fact Crawlit is a tool :

- Developed by the dofus community, for the community
- **100% performance** : Developed to be very light
- Simple to use | Plug and use
- [Interactive prompt](#interactive-prompt) & [Command prompt](#command-line-prompt)
- [Json file & MongoDB importable file generated](#json-files-also-provided-in-the-repository)
- Resume parsing feature after errors (connection off / 429 error / ...)
- [App packaged into **executable**, no need to install something](#optional-to-build-packaged-app)
- English & French encyclopedia supported (french item & english item)

## Interactive prompt

App launched           |  App at the end
:-------------------------:|:-------------------------:
![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/crawlit_API.gif)  |  ![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/crawlit6.JPG)

## Command line prompt
**You can run the program with those parameter (all lowercase):**


|Argument| Alias        |   Value  |
|:------:|:------------:|:---------|
| `-g`   | `--game`     | `dofus` or `dofus-touch`
| `-l`   | `--language` | `french` or `english`
| `-c`   | `--category` | `categoryName` ([see list of categories](#supported-items))
| `-a` or `-m`    | `--all` for `-a` or `--maxItem` for `-m`     | `Number` for `-m/--maxItem` (Amount of item you want)
| `-h`   | `--help`     |

**Example :** ```node ./lib/app.js --game dofus-touch --language english --category monster --maxItem 5```

**:warning: If you want all equipments or all weapons :** `-category` argument's value must be written like `allequipments` and `allweapons`. 

Example : ```node ./lib/app.js --game dofus-touch --language english --category allequipments --all```


## JSON files also provided in the repository
In case you wan't directly the dofus JSON files, I oftenly upload up-to-date encyclopedia JSON in the `data/` folder.

## JSON format
An item result example
```json
{  
  "_id":"item ID",
  "name":"item name",
  "description":"item description.",
  "lvl":"item lvl",
  "type":"item type",
  "imgUrl":"image url of the item",
  "url":"Item's link",
  "stats":[ "many statistics line", "stat 2", ["..."], "stat n" ],
  "condition":[ "many conditions line", "condition 2", ["..."], "condition n" ],
  "set":{  
     "equipments":[itemId, itemId ...],
     "weapons":[itemId, itemId ...],
  }
}
```

## Getting Started

Clone & access this repository locally :

``` bash
git clone https://github.com/raczak/crawlit-dofus-encyclopedia-parser.git
cd crawlit-dofus-encyclopedia-parser
```

**1) Install dependencies with npm :**

``` bash
npm install
```
**2) Then at the root folder launch the programm with npm or node :**

``` bash
npm start
```
**:warning: There is an issue with `npm start` on some CLI, in this case prefere use `node lib/app.js`.**

### [Optional] To build packaged app

If you want to generate packaged app (executable) with `pkg` dependency, you **MUST** install `zeit/pkg` in npm global context.  
Please follow [Pkg documentation](https://github.com/zeit/pkg) for troubleshooting.

**1) Install pkg package from npm repository**
``` bash
npm install -g pkg
```
**2) Then in a terminal window**
``` bash
npm run pkg-all
```

## Supported items
| Items       | state of progress        |
| ------------- |:-------------|
| `Equipment`     | 100 %  |
| `Weapon`    | 100 % |
| `Set` | 100 % |
| `Pet` | 100 % |
| `Mount` | 100 % |
| `Resource` | 100 % |
| `Consumable` | 100 % |
| `Professions` | 100 % |
| `Recipe` | 25 % |
| `Classe` | 0 % |
| `Bestiary` | 15 % |
| `Harnesse` | 0 % |
| `Idol` | 0 % |
| `Sidekick` | 0 % |
| `Haven Bag` | 0 % |

## We also have done an API !
Visite the official non-official Dofus API : **[DOFAPI](https://dofapi.fr)**

## Technologies choice
Crawlit is build with full javascript : [NodeJs/Npm](https://nodejs.org/en/), javascript.

![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/node-js.png)

## Bug & Crash || Proposal ?
For proposal don't hesitate to create a pool request or for a bug/crash an issue. You can also make us aware on [bugs channel in discord](http://discord.dofapi.fr).

## Discord
[Click here to join the sosnoob community on discord !](http://discord.dofapi.fr)

[<img src="https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/discord-Logo.jpg">](http://discord.dofapi.fr)


## Documentation if you want to contribute (dev)
**English Version :** [Access the wiki to understand the project and contribute to it](https://github.com/raczak/crawlit-dofus-encyclopedia-parser/wiki/Dev-Documentation-(English)). 

**French Version :** [There is also a french version of the documentation](https://github.com/raczak/crawlit-dofus-encyclopedia-parser/wiki/Dev-Documentation-(Français)) :smiley: ! 

## Join the dev Team ?
[Contact us on discord](http://discord.dofapi.fr) (channel general or private message to theukid)

## Project sponsors
<a href="https://www.digitalocean.com/">
  <img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/PoweredByDO/DO_Powered_by_Badge_blue.svg" width="20%" height="50">
</a>

## Contributors

| [<img src="https://avatars2.githubusercontent.com/u/9281021?v=3&s=117" width="117px;"/><br /><sub><b>Zakaria RACHEDI</b></sub>](https://github.com/raczak) | [<img src="https://avatars0.githubusercontent.com/u/17069089?v=3&s=117" width="117px;"/><br /><sub><b>Le Corre Julien</b></sub>](https://github.com/Edoz77) | [<img src="https://avatars2.githubusercontent.com/u/24317552?v=3&s=117" width="117px;"/><br /><sub><b>Yannick Milanetto</b></sub>](https://github.com/yannick-milanetto) | [<img src="https://avatars0.githubusercontent.com/u/22028659?s=117&v=3" width="117px;"/><br /><sub><b>Darkilen</b></sub>](https://github.com/Darkilen)
| :---: | :---: | :---: | :---: |
