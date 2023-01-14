export const scrollToAnchor = (
  sourceLocation: string,
  targetLocation: string,
  anchorName: string,
  navigate: any
) => {
  if (sourceLocation !== targetLocation) {
    navigate(targetLocation, { state: anchorName });
  }
  if (sourceLocation === targetLocation) {
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);

      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }
};
