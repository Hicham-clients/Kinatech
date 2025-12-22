import {  Transition, Variants } from "framer-motion";

export   const   transition:Transition= { type: "spring", stiffness: 80, damping: 20 }

export const animationOfParent:Variants = {
  hidden: { opacity: 0, scale: 0.97 ,y: 30},
  visible: {
    opacity: 1,
    rotate:0,
    scale: 1,
    y: 0,
    transition: {
      
      duration: 0.4,
      ease: "linear",
      when: "beforeChildren",
      staggerChildren: 0.2,
      delayChildren:0
    },
  },
}; 

export const opacityVariants:Variants={
  hidden:{opacity:0}
  , 
  visible:{
    opacity:1,
    transition:{
      duration: 0.4,
      ease: "linear",
      when: "beforeChildren",
      staggerChildren: 0.2,
      delayChildren:0.2
    }
  }
}
export const opacityChild:Variants={
  hidden:{opacity:0}, 
  visible:{opacity:1
    ,
    transition
  } 

}

export const animationOfChild:Variants = {
  hidden: { opacity: 0, y: 30,rotate:'2deg' },
  visible: {
    opacity: 1,
    rotate:0,
    y: 0,
    transition
  },
};


export const fadeupinitial={opacity:0,y:20}
export const fadeupanimate={opacity:1,y:0}
export const faderightinitial={opacity:0,x:-200}
export const faderightanimate={opacity:1,x:0}


export const once=  { once: true, amount: 0.3 }