import * as admin from 'firebase-admin';
import { CollectionReference } from 'firebase-admin/firestore';
export declare class FirebaseService {
    firebaseApp: admin.app.App;
    auth: admin.auth.Auth;
    firestore: admin.firestore.Firestore;
    userCollection: CollectionReference;
    constructor();
    private _createCollections;
}
