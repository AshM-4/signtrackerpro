import { useEffect, useState } from 'react';
import { db } from './firebaseConfig';

const useFetchLots = () => {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('lots').onSnapshot(snapshot => {
      const fetchedLots = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLots(fetchedLots);
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    return () => unsubscribe(); // Detach listener on unmount
  }, []);

  return lots;
};

export default useFetchLots;
