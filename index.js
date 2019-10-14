const admin = require('firebase-admin');
const serviceAccount = require("./private/credentials/service-account.json");
const data = require("./private/data/data.json");
const collectionKey = "my-collection"; //name of the collection

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    // , databaseURL: "https://your-database.firebaseio.com"
});

const firestore = admin.firestore();
const settings = {
    timestampsInSnapshots: true
};

firestore.settings(settings);

if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}