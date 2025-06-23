/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type QueryConstraint,
  type DocumentData,
  type QueryDocumentSnapshot,
  type FirestoreError,
} from "firebase/firestore"

import { onAuthStateChanged, type User } from "firebase/auth"
import { auth, db } from "@/lib/firebase/config";

export interface FirebaseQueryConfig {
  where?: Array<{ field: string; operator: any; value: any }>
  orderBy?: Array<{ field: string; direction?: "asc" | "desc" }>
  limit?: number
  startAfter?: QueryDocumentSnapshot<DocumentData>
}

let currentUser: User | null = null
let isRefreshing = false


onAuthStateChanged(auth, (user) => {
  currentUser = user
})

const handleFirebaseError = (error: FirestoreError) => {
  console.error("Firebase Error:", error)

  if (error.code === "permission-denied") {
    if (typeof window !== "undefined" && !isRefreshing) {
      isRefreshing = true
      window.location.href = "/login"
    }
  }

  return Promise.reject({
    statusCode: error.code,
    message: error.message,
    code: error.code,
    timestamp: new Date().toISOString(),
    path: "",
    method: "",
  })
}

export class FirebaseEndpoint {
  private collectionName: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }


  public getMany<T>(config?: FirebaseQueryConfig): Promise<T[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const collectionRef = collection(db, this.collectionName)
        const constraints: QueryConstraint[] = []

        if (config?.where) {
          config.where.forEach(({ field, operator, value }) => {
            constraints.push(where(field, operator, value))
          })
        }

        if (config?.orderBy) {
          config.orderBy.forEach(({ field, direction = "asc" }) => {
            constraints.push(orderBy(field, direction))
          })
        }

        if (config?.limit) {
          constraints.push(limit(config.limit))
        }

        if (config?.startAfter) {
          constraints.push(startAfter(config.startAfter))
        }

        const q = query(collectionRef, ...constraints)
        const querySnapshot = await getDocs(q)

        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        resolve(items as T[])
      } catch (error) {
        reject(handleFirebaseError(error as FirestoreError))
      }
    })
  }


  public getOne<T>(id: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, this.collectionName, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          resolve({ id: docSnap.id, ...docSnap.data() } as T)
        } else {
          throw new Error("Document not found")
        }
      } catch (error) {
        reject(handleFirebaseError(error as FirestoreError))
      }
    })
  }


  public get<T>(id?: string, config?: FirebaseQueryConfig): Promise<T[] | T> {
    if (id) {
      return this.getOne<T extends any[] ? T[0] : T>(id)
    } else {
      return this.getMany<T extends any[] ? T[0] : T>(config)
    }
  }

  public post<T, R>(data: T): Promise<R> {
    return new Promise(async (resolve, reject) => {
      try {
        const collectionRef = collection(db, this.collectionName)
        const docRef = await addDoc(collectionRef, {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })

        const newDoc = await getDoc(docRef)
        resolve({ id: newDoc.id, ...newDoc.data() } as R)
      } catch (error) {
        reject(handleFirebaseError(error as FirestoreError))
      }
    })
  }

  public put<T, R>(id: string, data: T): Promise<R> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, this.collectionName, id)
        await updateDoc(docRef, {
          ...data,
          updatedAt: new Date().toISOString(),
        })

        const updatedDoc = await getDoc(docRef)
        resolve({ id: updatedDoc.id, ...updatedDoc.data() } as R)
      } catch (error) {
        reject(handleFirebaseError(error as FirestoreError))
      }
    })
  }

  public patch<T, R>(id: string, data: Partial<T>): Promise<R> {
    return this.put(id, data as T)
  }

  public delete(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, this.collectionName, id)
        await deleteDoc(docRef)
        resolve()
      } catch (error) {
        reject(handleFirebaseError(error as FirestoreError))
      }
    })
  }
}
