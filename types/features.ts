

import { Variants } from "framer-motion";


export interface FeatureCardProps {
    feature: {
      title: string;
      description: string;
      icon: React.ReactNode;
      delay: number;
      bgColor: string;
      glowColor: string;
      borderColor: string;
      bgImage: string;  //images
    };
    variants: Variants,
    index: number
  }
