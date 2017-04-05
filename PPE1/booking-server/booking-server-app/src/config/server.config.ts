import * as path from 'path';

export const serverConfig = {
  port: process.env.PORT || '9090',
  roomImageRoot: process.env.ROOM_IMAGE_ROOT || process.env.NODE_ENV === 'production' ? '' : path.resolve(__dirname, '../../assets/user_img')
}