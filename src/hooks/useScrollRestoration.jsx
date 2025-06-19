import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // ฟังก์ชันสำหรับบันทึกตำแหน่ง scroll
    const handleScroll = () => {
      sessionStorage.setItem(`scrollPosition-${location.pathname}`, window.scrollY);
    };

    // ฟังก์ชันสำหรับเรียกคืนตำแหน่ง scroll
    const restoreScroll = () => {
      const savedPosition = sessionStorage.getItem(`scrollPosition-${location.pathname}`);
      if (savedPosition) {
        // ใช้ setTimeout เล็กน้อยเพื่อให้แน่ใจว่า DOM render เสร็จแล้ว
        setTimeout(() => window.scrollTo(0, parseInt(savedPosition, 10)), 100);
      }
    };

    // เรียกคืนตำแหน่งเมื่อ component โหลด
    restoreScroll();
    
    // เพิ่ม event listener เพื่อบันทึกตำแหน่งเมื่อผู้ใช้เลื่อน
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // ให้ effect นี้ทำงานใหม่ทุกครั้งที่ path เปลี่ยน
};

export default useScrollRestoration;
