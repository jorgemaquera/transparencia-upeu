import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

initializeApp();
export const storage = getStorage;
