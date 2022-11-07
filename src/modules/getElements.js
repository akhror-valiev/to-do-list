/* eslint-disable linebreak-style */
export default function getPosition(container, y) {
  const draggElement = [
    ...container.querySelectorAll('.draggables:not(.dragging'),
  ];

  return draggElement.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}