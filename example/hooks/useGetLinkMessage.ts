import { sending } from '../utils';

export default function getLinkMessages(ids: string[]) {
  if (ids && ids.length > 0) {
    return sending('getLinkmansLastMessages', {linkmans: ids});
  }

  return Promise.resolve({});
}
