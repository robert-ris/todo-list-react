import Amplify from "aws-amplify"

export default Amplify.configure({
  API: {
    endpoints: [
      {
        name: "TASKS_API",
        endpoint: process.env.TASKS_APP_API,
        region: "eu-west-2"
      }
    ]
  }
})