"use client";
import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2.5 }: AnimatedCounterProps) {
  const [startCounting, setStartCounting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startCounting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startCounting]);

  return (
    <span ref={ref}>
      {startCounting ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          separator=","
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        `${prefix}${end}${suffix}`
      )}
    </span>
  );
}
