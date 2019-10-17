# firestore-bulk-loader

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7df8ffe9407c444d9992e9aa16f50607)](https://www.codacy.com/manual/marcosvidolin/firestore-bulk-loader?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marcosvidolin/firestore-bulk-loader&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/marcosvidolin/firestore-bulk-loader.svg?branch=master)](https://travis-ci.org/marcosvidolin/firestore-bulk-loader)

A simple tool to load data to Cloud Firestore.

## How to Use

**Basic usage:**

***WARN: The document will be updated if an existing ID is used.***

```javascript
const serviceAccount = require('./private/credentials/service-account.json');

const data = [
    { myId: "j1", name:"John", age:30 },
    { myId: "m2", name:"Mario", age:25 },
    { myId: "b3", name:"Bruna", age:33 }
];

bulkLoader.load(data, "my-collection", serviceAccount);
```

**To specify a custom id:**

```javascript
const serviceAccount = require('./private/credentials/service-account.json');

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
