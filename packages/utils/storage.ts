export function getItem(key: string) {
  const data = window.localStorage.getItem(key);
  if (!data) return null;
  try {
    const stringifyResult = JSON.parse(data);
    return stringifyResult;
  } catch (_) {
    return null;
  }
}

export function setItem(key: string, data: any) {
  let stringifyResult: string = '';
  if (typeof data === 'object') {
    stringifyResult = JSON.stringify(data);
  } else {
    stringifyResult = data;
  }
  window.localStorage.setItem(key, stringifyResult);
}
