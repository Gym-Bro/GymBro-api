import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CollectionReference } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  // private readonly serviceAccount: any;
  public firebaseApp: admin.app.App;
  public auth: admin.auth.Auth;
  public firestore: admin.firestore.Firestore;
  // public userCollection: CollectionReference;
  // public contactCollection: CollectionReference;
  public storage: admin.storage.Storage;

  constructor() {
    // this.serviceAccount = require('./../../../firebase_sdk.json');
    this.firebaseApp = admin.initializeApp({
      // credential: admin.credential.cert(this.serviceAccount),
      // databaseURL: 'https://gymbro-27bb2-default-rtdb.firebaseio.com',
      credential: admin.credential.applicationDefault(),
      databaseURL: 'localhost:8080',
      storageBucket: 'gymbro-27bb2.appspot.com',
    });
    this.auth = this.firebaseApp.auth();
    this.firestore = this.firebaseApp.firestore();
    //this._createCollections();
    this.storage = this.firebaseApp.storage();
  }
}
