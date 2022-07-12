import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'

export default function useFirestore(collection1) {
    const [docs, setDocs] = useState([])
    useEffect(() => {
        async function getAllDocs() {
            const collRef = collection(db, collection1) //the name of the input in line 5 was changed not to collicde with the actual "collection" function in this line 
            const q = query(collRef, orderBy('createdAt', 'desc'))
            const unsub = onSnapshot(q, (snap) => {
                let documents = [];
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                })
                setDocs(documents)
            })
        }
        getAllDocs()
    }, [collection1])//this is buggy becasue it should update also on file added, but i did not change it yet
    return { docs }
}


//old version from youtube

// export default function useFirestore(collection1) {
//     const [docs, setDocs] = useState([])

//     useEffect(() => {
//         const unsub = collection(db, collection1)
//             .orderBy('createdAt', 'desc')
//             .onSnapshot((snap) => {
//                 let documents = [];
//                 snap.forEach(doc => {
//                     documents.push({ ...doc.data(), id: doc.id })
//                 })
//                 setDocs(documents)
//             })
//         return () => unsub()

//     }, [collection1])

//     return { docs }
// }