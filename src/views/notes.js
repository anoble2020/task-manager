import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Quill from 'quill';
import "quill/dist/quill.core.css";
import 'quill/dist/quill.snow.css';

const Notes = () => {
    const editorRef = useRef(null);
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        if (editorRef.current) {
            try {
                const quill = new Quill(editorRef.current, {
                    placeholder: 'Start typing...',
                    theme: 'snow',
                });
                setQuill(quill);
                console.log('Quill editor initialized:', quill);
            } catch (error) {
                console.error('Error initializing Quill editor:', error);
            }
        }
    }, []);

    const handleSave = () => {
        if (quill) {
            const content = quill.root.innerHTML;
            console.log('Editor content:', content);
        }
    };

    const headerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <div>
            <motion.h1
                className="font-medium"
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                transition={{ ease: "linear", duration: 0.8 }}>
                Notes
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} ref={editorRef} id="editor" style={{ height: '200px', border: '1px solid #ccc' }}>
            </motion.div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Notes;