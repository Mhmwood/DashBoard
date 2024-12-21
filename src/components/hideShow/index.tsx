import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface HideShowProps {
  children: React.ReactNode;
  storageKey: string; // Unique key for localStorage
}

export const HideShow: React.FC<HideShowProps> = ({ children, storageKey }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  const storedVisibility = localStorage.getItem(storageKey);
  const initialVisibility = storedVisibility === "true";

  const [maxHeight, setMaxHeight] = useState("0px");

  const toggleVisibility = () => {
    const newVisibility = !isHidden;
    setIsHidden(newVisibility);
    localStorage.setItem(storageKey, String(newVisibility)); 
  };

 
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); 
    }
  }, [children]);

 
  useEffect(() => {
    setIsHidden(initialVisibility); 
  }, [initialVisibility]);

  useEffect(() => {

    localStorage.setItem(storageKey, String(isHidden));
  }, [isHidden, storageKey]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        onClick={toggleVisibility}
        style={{ margin: "1rem  0rem", alignSelf: "flex-end" }}
      >
        {isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </Button>
      <div
        ref={contentRef}
        className={`content-container ${isHidden ? "hidden" : ""}`}
        style={{
          overflow: "hidden",
          maxHeight: isHidden ? "0px" : maxHeight,
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};
