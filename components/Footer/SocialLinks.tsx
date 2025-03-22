import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function SocialLinks() {
  const socialLinks = [
    { Icon: Facebook, link: "https://www.facebook.com/profile.php?id=61574417074384" },
    { Icon: Twitter, link: "https://x.com/NirveonX" },
    { Icon: Instagram, link: "https://www.instagram.com/nirveonx/" },
    { Icon: Linkedin, link: "https://www.linkedin.com/company/nirveonx/" },
    { Icon: Github, link: "https://github.com/NirveonX" }
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ Icon, link }, index) => (
        <motion.a
          key={index}
          href={link} 
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={`Social media link ${index + 1}`}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          target="_blank" 
          rel="noopener noreferrer" 
        >
          <Icon className="h-5 w-5" />
        </motion.a>
      ))}
    </div>
  );
}
