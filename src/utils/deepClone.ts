export const deepClone = (origin: any, target?: Record<string, any>): any => {
  const tar = target || {};
  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
};

export const deepCloneArr = (origin: any[]): any[] => {
  const res: any[] = [];
  origin.forEach((item: any) => {
    const obj = deepClone(item);
    res.push(obj);
  });
  return res;
};
