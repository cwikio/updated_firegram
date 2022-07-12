import { useState, useEffect } from "react";
import { storage, db } from '../firebase/firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";


const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        const createdAt = Timestamp.now().toDate()
        const storageRef = ref(storage, file.name) // this file name should be changed to something that allows multiple uploads of a file with same name
        const uploadTask = uploadBytesResumable(storageRef, file)
        const collectionRef = collection(db, 'images')

        uploadTask.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                setUrl(downloadURL)
                await addDoc(collectionRef, { downloadURL, createdAt })
            });

        })
    }, [file])

    return { progress, url, error }
}
export default useStorage;