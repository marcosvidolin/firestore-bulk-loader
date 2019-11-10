# firestore-bulk-loader

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7df8ffe9407c444d9992e9aa16f50607)](https://www.codacy.com/manual/marcosvidolin/firestore-bulk-loader?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marcosvidolin/firestore-bulk-loader&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/marcosvidolin/firestore-bulk-loader.svg?branch=master)](https://travis-ci.org/marcosvidolin/firestore-bulk-loader)

A simple tool to load data to Cloud Firestore.

## How to install

```shell
npm i firestore-bulk-loader
```

## How to Use

**Basic usage:**

```javascript
const bulkLoader = require('firestore-bulk-loader');
const serviceAccount = require('./path/to/service-account.json');
const data = require('path/to/data.json');

bulkLoader.load(data, "my-collection", serviceAccount);
```

or

```javascript
const bulkLoader = require('firestore-bulk-loader');
const serviceAccount = require('./path/to/service-account.json');

const data = [
    { name:"John", age:30 },
    { name:"Mario", age:25 },
    { name:"Bruna", age:33 }
];

bulkLoader.load(data, "my-collection", serviceAccount);
```

**To specify a custom id:**

***WARN: The document will be updated if an existing ID is used.***

```javascript
const bulkLoader = require('firestore-bulk-loader');
const serviceAccount = require('./path/to/service-account.json');

const data = [
    { myId: "j1", name:"John", age:30 },
    { myId: "m2", name:"Mario", age:25 },
    { myId: "b3", name:"Bruna", age:33 }
];

// the name of the attribute to use as ID.
var options = {
    documentKeyProperty: "myId"
}

bulkLoader.load(data, "my-collection", serviceAccount, options);
```

**CSV files:**

```javascript
const bulkLoader = require('firestore-bulk-loader');
const serviceAccount = require('./path/to/service-account.json');

const data = require('./path/to/data.csv');

var options = {
    csv: true
}

bulkLoader.load(data, "my-collection", serviceAccount, options);
```

## Options

| Parameter           | Description                            | Default  | Required |
|---------------------|----------------------------------------|----------|----------|
| documentKeyProperty | The name of the attribute to use as ID |          | No       |
| csv                 | specifies that the data type is CSV    | false    | No       |

## Considerations

- If you load a collection that dons't exists in the Firestore it will be created;
- If the collections already exist in the Firestore all the data will be added to the existent collection;
- A Document will only be replaced if the given 'id' alread exists in the collection. This case only happens when used **documentKeyProperty** option;

## Contributors

[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/0)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/0)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/1)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/1)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/2)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/2)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/3)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/3)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/4)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/4)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/5)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/5)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/6)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/6)[![](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/images/7)](https://sourcerer.io/fame/marcosvidolin/marcosvidolin/firestore-bulk-loader/links/7)
