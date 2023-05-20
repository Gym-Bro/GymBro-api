import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CollectionReference } from 'firebase-admin/firestore';
const serviceAccount = require('./../../../../../gymbro-27bb2-firebase-adminsdk-286ab-120259787c.json');
@Injectable()
export class FirebaseService {
  // private readonly serviceAccount: any;
  public firebaseApp: admin.app.App;
  public auth: admin.auth.Auth;
  public firestore: admin.firestore.Firestore;

  public userCollection: CollectionReference;
  constructor() {
    // this.serviceAccount = require('./../../../firebase_sdk.json');
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // databaseURL: 'https://gymbro-27bb2-default-rtdb.firebaseio.com',
      //credential: admin.credential.applicationDefault(),
      databaseURL: 'localhost:8080',
    });
    this.auth = this.firebaseApp.auth();
    this.firestore = this.firebaseApp.firestore();
    this._createCollections();
  }

  private _createCollections() {
    this.userCollection = this.firestore.collection('users');
  }
  // public initFirestoreDatabase() {
  //   return this.firebaseApp.firestore();
  // }

  // public initAuth() {
  //   return this.firebaseApp.auth();
  // }
}
