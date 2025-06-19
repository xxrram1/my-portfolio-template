import React, { createContext, useState, useEffect, useContext } from 'react';

const VisitorContext = createContext();

export const useVisitor = () => useContext(VisitorContext);

export const VisitorProvider = ({ children }) => {
  // ค่าเริ่มต้นคือ null เพื่อรอการตรวจสอบจาก localStorage
  const [visitorType, setVisitorType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVisited, setHasVisited] = useState(true); // ตั้งเป็น true ไว้ก่อน

  useEffect(() => {
    const storedType = localStorage.getItem('visitorType');
    const visitedFlag = localStorage.getItem('hasVisitedPortfolio');

    if (storedType) {
      setVisitorType(storedType);
      setIsModalOpen(false);
    } else if (!visitedFlag) {
      // ถ้าไม่เคยมี type และไม่เคยเข้าเว็บมาก่อน ให้เปิด Modal
      setIsModalOpen(true);
    }
    // ถ้าเคยเข้าแล้วแต่ไม่ได้เลือก (กดปิด modal) ก็ไม่ต้องทำอะไร
    
    setHasVisited(!!visitedFlag); // แปลงเป็น boolean
  }, []);

  const handleSetVisitorType = (type) => {
    localStorage.setItem('visitorType', type);
    // ตั้งค่าว่าเคยเข้าชมแล้ว เพื่อไม่ให้ Modal เปิดอีกในครั้งถัดไป
    if (!localStorage.getItem('hasVisitedPortfolio')) {
      localStorage.setItem('hasVisitedPortfolio', 'true');
    }
    setVisitorType(type);
    setIsModalOpen(false);
    setHasVisited(true);
  };
  
  const openChangeViewModal = () => {
    setIsModalOpen(true);
  };
  
  const value = {
    visitorType: visitorType || 'default', // ถ้ายังไม่มีค่า ให้ใช้ 'default'
    setVisitorType: handleSetVisitorType,
    isModalOpen,
    setIsModalOpen,
    openChangeViewModal,
    hasVisited,
  };

  return (
    <VisitorContext.Provider value={value}>
      {children}
    </VisitorContext.Provider>
  );
};
