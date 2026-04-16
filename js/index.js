async function loadDashboard() {
    const announceContent = document.getElementById('announcement-content');
    const hwContent = document.getElementById('hw-content');
    const eventContent = document.getElementById('event-content');

    try {
        // เรียกข้อมูลจากฟังก์ชัน index ใน Netlify
        const response = await fetch('/.netlify/functions/index');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();


        if (data.announcement && data.announcement.text) {
            announceContent.innerHTML = `<p>${data.announcements.text}</p>`;
        } else {
            announceContent.innerHTML = "<p>ไม่มีประกาศในขณะนี้</p>";
        }

  
        if (data.homework && data.homework.length > 0) {
            hwContent.innerHTML = data.homeworks.map(item => `<p>• ${item.title}</p>`).join('');
        } else {
            hwContent.innerHTML = "<p>ยังไม่มีการบ้าน</p>";
        }

  
        if (data.events && data.events.length > 0) {
            eventContent.innerHTML = data.events.map(item => `<p>• ${item.name}</p>`).join('');
        } else {
            eventContent.innerHTML = "<p>ยังไม่มีกิจกรรมเร็วๆ นี้</p>";
        }

    } catch (error) {
        console.error("Error loading dashboard data:", error);
        announceContent.innerHTML = "โหลดข้อมูลไม่สำเร็จ";
        hwContent.innerHTML = "โหลดข้อมูลไม่สำเร็จ";
        eventContent.innerHTML = "โหลดข้อมูลไม่สำเร็จ";
    }
}

// เริ่มทำงานเมื่อโหลดหน้าเว็บเสร็จ
document.addEventListener('DOMContentLoaded', loadDashboard);