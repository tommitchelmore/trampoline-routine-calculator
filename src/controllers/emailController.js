import axios from "axios"

export default {
  confirmationEmail: async (name, email, code) => {
    const res = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        from: {
          email: process.env.SENDGRID_EMAIL_FROM
        },
        template_id: process.env.SENDGRID_TEMPLATE_ID,
        personalizations: [
          {
            to: [
              {
                email
              }
            ],
            dynamic_template_data: {
              name,
              code
            }
          }
        ]
      },
      {
        headers: {
          'Authorization': 'Bearer ' + process.env.SENDGRID_KEY,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(res.data)
  }
}