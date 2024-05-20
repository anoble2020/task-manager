import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/today'));
      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      setQuote(parsedData[0].q);
      setAuthor(parsedData[0].a);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
    fetchQuote();
  }, []);

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
          Home
        </motion.h1>
      {/* Quote section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="bg-gray-100 p-4 rounded-lg">
      <blockquote className="text-xl font-serif italic mb-2">{quote}</blockquote>
      <footer className="text-gray-600">— {author}</footer>
      </motion.div>
    </div>
  );
};

export default Home;