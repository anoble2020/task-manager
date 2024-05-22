import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {

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
                Projects
            </motion.h1>
        </div>
    );
};

export default Projects;