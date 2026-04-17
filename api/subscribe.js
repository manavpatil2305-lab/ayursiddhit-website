 export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const PLAN_ID = "plan_SeVC8NLiDhkGpQ"; 
    const RZP_KEY_ID = "rzp_live_SeWOakhF098GMl"; 
    const RZP_KEY_SECRET = "hMyfSZ3Fw9m594VzsFHiq6c5"; 

    const authString = Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString('base64');

    try {
        const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify({
                plan_id: PLAN_ID,
                total_count: 120, 
                customer_notify: 1 
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate subscription" });
    }
}
