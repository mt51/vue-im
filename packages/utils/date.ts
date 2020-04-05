import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/zh-cn')

dayjs.locale('zh-cn')
dayjs.extend(relativeTime);

export default dayjs;