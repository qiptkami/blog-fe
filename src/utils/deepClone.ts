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

export const isEqualArr = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
};
