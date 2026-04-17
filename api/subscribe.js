export default async function handler(req, res) {
    // 🚨 SECURITY CHECK: Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const PLAN_ID = "plan_SeVC8NLiDhkGpQ"; // Your exact Monthly Plan
    const RZP_KEY_ID = "rzp_live_SXjt9artK2r8K9"; // Your Live Key
    
    // 👇 PASTE YOUR SECRET KEY BETWEEN THE QUOTES BELOW 👇
    const RZP_KEY_SECRET = "PASTE_YOUR_SECRET_KEY_HERE"; 

    // Combine keys for banking security
    const authString = Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString('base64');

    try {
        // Ping Razorpay's Master Server to generate a Subscription Ticket
        const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify({
                plan_id: PLAN_ID,
                total_count: 120, // 10 years of auto-billing
                customer_notify: 1 // Razorpay sends them the official mandate link
            })
        });

        const data = await response.json();
        
        // Send the generated subscription ID back to your website
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate subscription" });
    }
}

