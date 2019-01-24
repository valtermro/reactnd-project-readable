export function isChildOf(parent, node) {
  if (node.parentNode === parent) {
    return true;
  }

  if (!node.parentNode) {
    return false;
  }

  return isChildOf(parent, node.parentNode);
}
