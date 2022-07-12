import React from 'react'
import useFirestore from './../hooks/useFirestore';
import { motion } from 'framer-motion'

export default function ImageGrid({ setSelectedImage }) {
    const { docs } = useFirestore('images')
    console.log(docs)
    return (
        <div className='img-grid'>
            {docs && docs.map(doc => (
                <motion.div className='img-wrap' key={doc.id}
                    layout
                    whileHover={{ opacity: 1 }}
                    onClick={() => { setSelectedImage(doc.downloadURL) }}
                >
                    <motion.img src={doc.downloadURL} alt='some alt text'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
