interface OrderData {
  timestamp: string;
  items: {
    id: number;
    name: string;
    description: string;
  }[];
}

export const sendOrderEmail = async (orderData: OrderData) => {
  try {
    // Format the items into a readable HTML string
    const formattedItems = orderData.items.map(item => 
      `<div style="margin-bottom: 10px;">
        <strong>${item.name}</strong><br/>
        Description: ${item.description}
       </div>`
    ).join('');

    // Create the email content
    const emailContent = {
      service_id: 'service_q5xh2q8',
      template_id: 'template_d2ts3eq',
      user_id: 'JOAaGNtsyOY4Q6EP3',
      template_params: {
        to_email: '001tanay@gmail.com',
        subject: 'New Order Received',
        message: `
          <h2>Order Details:</h2>
          <p><strong>Order Time:</strong> ${new Date(orderData.timestamp).toLocaleString()}</p>
          
          <h3>Selected Items:</h3>
          ${formattedItems}
          
          <hr/>
          
          <p><strong>Raw Order Data:</strong></p>
          <pre>${JSON.stringify(orderData, null, 2)}</pre>
        `
      }
    };

    console.log('Sending email with data:', emailContent);

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('EmailJS Error:', errorData);
      throw new Error(`Failed to send email: ${errorData?.message || response.statusText}`);
    }

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}; 