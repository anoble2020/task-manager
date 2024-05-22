import { motion } from "framer-motion";
import Backdrop from "./modal_bg.js";
import './modals.css';

const dropIn = {
    hidden: {
        y: "40px",
      opacity: 0,
    },
    visible: {
     y: "0",
      opacity: 1,
      transition: {
        type: "intertia",
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1]
      },
    },
    exit: {
        y: "40px",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    }
    },
  };
  

const Modal = ({ handleClose, content }) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p>{content}</p>
          </motion.div>
      </Backdrop>
    );
  };

  
  export default Modal;