import Pusher from 'pusher'
import { type ResponseObjectData } from '../helpers/request'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.PUSHER_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: process.env.PUSHER_CLUSTER ?? '',
  useTLS: true
})

export const notify = async (
  channel: string | string[],
  event: string,
  message: ResponseObjectData
): Promise<void> => {
  await pusher.trigger(channel, event, {
    message
  })
}
