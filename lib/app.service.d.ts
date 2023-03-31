import { DocumentData } from 'firebase-admin/firestore';
import { FirebaseService } from './firebase/firebase.service';
export declare class AppService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    getHello(): string;
    getUsers(): Promise<DocumentData[]>;
}
