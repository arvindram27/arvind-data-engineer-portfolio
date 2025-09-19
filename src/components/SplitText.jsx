import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 80,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 30, rotationX: 90 },
  to = { opacity: 1, y: 0, rotationX: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete = () => {}
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [splitElements, setSplitElements] = useState([]);

  // Custom text splitting function
  const splitTextIntoElements = (text, type) => {
    if (type === 'chars') {
      return text.split('').map((char, i) => ({
        content: char === ' ' ? '\u00A0' : char,
        index: i
      }));
    } else if (type === 'words') {
      return text.split(' ').map((word, i) => ({
        content: word,
        index: i
      }));
    }
    return [{ content: text, index: 0 }];
  };

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
    
    // Split the text into elements
    setSplitElements(splitTextIntoElements(text, splitType));
  }, [text, splitType]);

  useGSAP(
    () => {
      if (!ref.current || !fontsLoaded || splitElements.length === 0) return;
      
      const el = ref.current;
      const elements = el.querySelectorAll('.split-element');
      
      if (elements.length === 0) return;
      
      // Set initial state
      gsap.set(elements, { ...from });
      
      // Create the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onComplete: () => {
          animationCompletedRef.current = true;
          onLetterAnimationComplete?.();
        }
      });
      
      tl.to(elements, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
      });
      
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        tl.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        splitElements.length,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderContent = () => {
    if (splitElements.length === 0) {
      return text;
    }
    
    return splitElements.map((element, i) => (
      <span
        key={i}
        className="split-element"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          marginRight: splitType === 'words' ? '0.25em' : '0'
        }}
      >
        {element.content}
      </span>
    ));
  };

  const style = {
    textAlign,
    overflow: 'hidden',
    display: 'block',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  };
  const classes = `split-parent ${className}`;
  
  const TagComponent = tag;
  
  return (
    <TagComponent ref={ref} style={style} className={classes}>
      {renderContent()}
    </TagComponent>
  );
};

export default SplitText;
