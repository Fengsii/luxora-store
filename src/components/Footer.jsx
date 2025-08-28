// const Footer = () =>{
//     return (
//         <>
//             <h1>Instagram</h1>
//             <h1>facebook</h1>
//             <h1>LinkedIn</h1>
//             <h1>@Efengsi Rahmanto Zalukhu 2025</h1>
//             <h1>Github</h1>
//             <h1>Portofolio</h1>
//         </>
//     )
// }

// export default Footer;






// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Github, 
  Mail, 
  MapPin, 
  Phone, 
  Globe,
  Heart,
  ArrowRight,
  Send
} from "lucide-react";

const Footer = () => {
  // Animasi untuk container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Animasi untuk item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Animasi untuk icon sosial media
  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    },
    hover: {
      scale: 1.2,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div 
              className="flex items-center mb-6"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-900 font-bold text-xl">L</span>
              </div>
              <h2 className="text-3xl font-bold">LUXORA STORE</h2>
            </motion.div>
            <motion.p 
              className="text-blue-100 mb-6 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Temukan keanggunan dan kemewahan dalam setiap koleksi fashion eksklusif kami. 
              Luxora Store menghadirkan gaya hidup mewah yang terjangkau untuk Anda yang 
              menghargai kualitas dan keindahan.
            </motion.p>
            
            {/* Newsletter */}
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-blue-100 mb-4">
                Dapatkan update koleksi terbaru dan penawaran eksklusif
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 w-full"
                />
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-r-lg flex items-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} className="mr-2" />
                  Berlangganan
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Kontak */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-700">KONTAK</h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={18} className="mr-3 mt-1 text-blue-300" />
                <span className="text-blue-100">Jl. Fashion Boulevard No. 123<br />Jakarta Selatan, 12345</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone size={18} className="mr-3 text-blue-300" />
                <span className="text-blue-100">+62 21 1234 5678</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone size={18} className="mr-3 text-blue-300" />
                <span className="text-blue-100">+62 812 3456 7890</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail size={18} className="mr-3 text-blue-300" />
                <span className="text-blue-100">hello@luxorastore.com</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Globe size={18} className="mr-3 text-blue-300" />
                <span className="text-blue-100">www.luxorastore.com</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Kategori & Layanan */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-700">KATEGORI</h3>
                <ul className="space-y-3">
                  {[
                    "Dress Collection",
                    "Casual Wear",
                    "Business Attire",
                    "Evening Gown",
                    "Accessories",
                    "Jewelry"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a href="#" className="text-blue-100 hover:text-white transition-colors flex items-center">
                        <ArrowRight size={14} className="mr-2 text-blue-400" />
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-blue-700">LAYANAN</h3>
                <ul className="space-y-3">
                  {[
                    "Personal Shopping",
                    "Custom Fitting",
                    "Free Delivery",
                    "Easy Return",
                    "Secure Payment",
                    "24/7 Support"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a href="#" className="text-blue-100 hover:text-white transition-colors flex items-center">
                        <ArrowRight size={14} className="mr-2 text-blue-400" />
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Media & Copyright */}
        <motion.div 
          className="pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-4 mb-4 md:mb-0">
            <motion.a 
              href="#" 
              className="bg-blue-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a 
              href="#" 
              className="bg-blue-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Facebook size={18} />
            </motion.a>
            <motion.a 
              href="#" 
              className="bg-blue-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a 
              href="#" 
              className="bg-blue-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Github size={18} />
            </motion.a>
          </div>
          
          <motion.p 
            className="text-blue-200 flex items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Made with <Heart size={16} className="mx-1 text-red-400" fill="currentColor" /> by 
            <span className="font-semibold ml-1">Efengsi Rahmanto Zalukhu</span> 
            <span className="mx-2">•</span> 
            <span>© 2025</span>
          </motion.p>
          
          <motion.a 
            href="#" 
            className="text-blue-200 hover:text-white mt-4 md:mt-0 flex items-center transition-colors"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span>Portofolio</span>
            <ArrowRight size={16} className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;