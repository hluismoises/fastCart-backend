import { connect, ConnectOptions } from "mongoose"

export const dbConnect = () => {
  connect(
    process.env.MONGO_URI! ||
      "mongodb+srv://tester:123@cluster0.crj8l.mongodb.net/fastCartDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  ).then(
    () => console.log("connect successfully"),
    (error) => console.log(error)
  )
}
