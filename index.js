/*!
 * firestore-bulk-loader
 * Copyright(c) 2019 Marcos A. Vidolin de Lima
 * MIT Licensed
 */
"use strict";

const admin = require('firebase-admin');
const csv = require('csvtojson');

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

    let firestore = admin.firestore();
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
    if (!Array.isArray(data)) {
        throw new Error("Invalid data. You must inform an array.");
    }
};

/**
 * Converts CSV data into JSON.
 * 
 * @param {*} data 
 */
const convertCsvToJson = async (data) => {
    return await csv().fromString(data);
};

/**
 * Loads the data with a specific ID.
 * 
 * @param {*} data 
 * @param {*} collectionKey
 * @param {*} firestore
 * @param {*} documentKeyProperty 
 */
const loadDataWithId = (data, collectionKey, firestore, documentKeyProperty) => {
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
 * @param {*} firestore
 */
const loadDataWithoutId = (documents, collectionKey, firestore) => {
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
const loadData = async (data, collectionKey, serviceAccount, options) => {

    if (!data) {
        throw new Error("No data to load.");
    }

    let opts = options || {};
    const docKeyProperty = opts.documentKeyProperty;
    const isCsv = opts.csv;

    let documents = data;
    if (isCsv) {
        documents = await convertCsvToJson(data);
    }

    checkData(documents);

    let firestore = configureFirestore(serviceAccount);

    if (docKeyProperty) {
        loadDataWithId(documents, collectionKey, firestore, docKeyProperty);
    } else {
        loadDataWithoutId(documents, collectionKey, firestore);
    }
};

/**
 * Exports.
 */
module.exports = {
    load: loadData
};