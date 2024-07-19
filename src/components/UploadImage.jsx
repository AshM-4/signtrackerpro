import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, storage } from './firebaseConfig';

const UploadImage = ({ lotId, docId, eventNumber, imageType, docType }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const storageRef = ref(storage, `events/${lotId}/${eventNumber}/${imageType}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            const eventDocRef = doc(db, 'lots', docId);
            const updateField = `events.${eventNumber}.${docType}`;
            
            await updateDoc(eventDocRef, {
                [updateField]: arrayUnion(downloadURL)
            });

            alert('File uploaded successfully');
            setFile(null);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadImage;
