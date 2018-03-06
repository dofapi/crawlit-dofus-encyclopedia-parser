[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
# Crawlit - Dofus encyclopedia parser - Build your own Dofus API

In order to respond to a need expressed by the community, I create an encyclopedia parser for `Dofus` available for : </br>
- `Windows`
- `OSX` 
- `Linux`

**Download** : [All versions are available here](https://github.com/raczak/crawlit-dofus-encyclopedia-parser/releases)


**:warning: Don't use the tool for more than 20 pages per hour**

Crawlit was built to be very light full, it can run on almost every configurations.

In fact Crawlit is a tool :

- Developed by the dofus community, for the community
- **100% performance** : Developed to be very light full
- Simple to use | Plug and use
- English & French encyclopedia supported

App launched           |  App at the end
:-------------------------:|:-------------------------:
![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/crawlit1.JPG)  |  ![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/crawlit6.JPG)

## JSON files also provided in the repository
In case you wan't directly the dofus JSON files, I oftenly upload up-to-date encyclopedia JSON in the `data/` folder.

## JSON format
An item result example
```json
{  
  "item_identifiant":"item ID",
  "name":"item name",
  "description":"item description.",
  "lvl":"item lvl",
  "type":"item type",
  "imgUrl":"image url of the item",
  "url":"Item's link",
  "stats":[ "many statistics line", "stat 2", ["..."], "stat n" ],
  "condition":[ "many conditions line", "condition 2", ["..."], "condition n" ],
  "set":{  
     "id":"set ID in order to link it with items (relation : one to many)",
     "url":"set url",
     "name":"set name"
  }
}
```

## App usage example
![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/crawlit_API.gif)

## Technologies choice
Crawlit is build with full javascript : [NodeJs/Npm](https://nodejs.org/en/), javascript.

![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/node-js.png)

## Bug & Crash | Proposal ?
Don't hesitate to create an issue.

## Discord
Coming soon !

![](https://raw.githubusercontent.com/raczak/crawlit-dofus-encyclopedia-parser/master/assets/discord-Logo.jpg)

## Join the dev Team ?
Coming soon !
