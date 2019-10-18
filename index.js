/*!
 * firestore-bulk-loader
 * Copyright(c) 2019 Marcos A. Vidolin de Lima
 * MIT Licensed
 */
"use strict";

const admin = require('firebase-admin');

let firestore = undefined;

/**
 * Configures the Firestore object.
 * 
 * @param {string} serviceAccount
 * @returns {Object} firestore
 */
const configureFirestore = (serviceAccount) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    firestore = admin.firestore();
    firestore.settings({
        timestampsInSnapshots: true
    });

    return firestore;
};

/**
 * Converts the given data into valid documents to be imported.
 * 
 * @param {*} data 
 * @returns documents
 */
const checkData = (data) => {
    if (!data) {
        throw new Error("No data to load.");
    }
    if (!Array.isArray(data)) {
        throw new Error("Invalid data. You must inform an array.");
    }
};

/**
 * Loads the data with a specific ID.
 * 
 * @param {*} data 
 * @param {*} collectionKey 
 * @param {*} documentKeyProperty 
 */
const loadDataWithId = (data, collectionKey, documentKeyProperty) => {
    Object.keys(data).forEach(docKey => {
        let document = data[docKey];
        let id = document[documentKeyProperty];
        firestore.collection(collectionKey).doc(id).set(document).then((ref) => {
            // console.log('Added document with ID: ', id);
        });
    });
};

/**
 * Loads the data without ID. Google Firestore will auto generate the ID.
 * 
 * @param {*} documents 
 * @param {*} collectionKey 
 */
const loadDataWithoutId = (documents, collectionKey) => {
    Object.keys(documents).forEach(doc => {
        firestore.collection(collectionKey).add(documents[doc]).then(ref => {
            // console.log('Added document with ID: ', ref.id);
        });
    });
};

/**
 * A simple Firestore loader.
 * 
 * @param {*} data 
 * @param {*} collectionKey 
 * @param {*} serviceAccount 
 * @param {*} options 
 */
const loadData = function (data, collectionKey, serviceAccount, options) {

    checkData(data);

    let opts = options || {};
    const docKeyProperty = opts.documentKeyProperty;

    configureFirestore(serviceAccount);

    if (docKeyProperty) {
        loadDataWithId(data, collectionKey, docKeyProperty);
    } else {
        loadDataWithoutId(data, collectionKey);
    }
};

/**
 * Exports.
 */
module.exports = {
    load: loadData
};