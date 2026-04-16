const { MongoClient } = require('mongodb');

// ดึง URI จาก Environment Variables ใน Netlify
const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
    try {
        await client.connect();
        const database = client.db("test"); // ชื่อ Database ของคุณ

        // ดึงข้อมูลจากทั้ง 3 Collection
        const homework = await database.collection("homework").find({}).toArray();
        const events = await database.collection("events").find({}).toArray();
        const announcement = await database.collection("announcements").findOne({}); // ดึงมาแค่ 1 อัน

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                homework: homework,
                events: events,
                announcement: announcement || { text: "ไม่มีประกาศในขณะนี้" }
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data", details: error.toString() })
        };
    } finally {
        await client.close();
    }
};