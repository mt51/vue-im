export default {
  // eslint-disable-next-line no-unused-vars
  bind(el, binding) {
    let params = {
      flag: false,
      target: null
    };
    document.onselectstart = function() {
      return false;
    };
    el.onmousedown = function(e) {
      const pageWidth = document.documentElement.clientWidth;
      const pageHeight = document.documentElement.clientHeight;
      e = e || window.event;
      params.target = el._dragTarget;
      params.flag = true;
      params.mouseX = e.clientX;
      params.mouseY = e.clientY;
      params.initX = params.target.offsetLeft;
      params.initY = params.target.offsetTop;
      params.targetWidth = params.target.offsetWidth;
      params.targetHeight = params.target.offsetHeight;
      params.right = pageWidth - params.targetWidth;
      params.bottom = pageHeight - params.targetHeight;
    };
    el.onmousemove = function(e) {
      if (params.flag) {
        let currentX = e.clientX - params.mouseX + params.initX;
        let currentY = e.clientY - params.mouseY + params.initY;
        currentX = currentX <= 0 ? 0 : currentX;
        currentY = currentY <= 0 ? 0 : currentY;
        currentX = currentX >= params.right ? params.right : currentX;
        currentY = currentY >= params.bottom ? params.bottom : currentY;
        params.target.style.left = currentX + params.targetWidth / 2 + 'px';
        params.target.style.top = currentY + params.targetHeight / 2 + 'px';
      }
    };
    el.onmouseup = function() {
      params.flag = false;
    };
    el.onmouseleave = function() {
      params.flag = false;
    };
  },
  update(el, binding) {
    el._dragTarget = binding.value;
  }
};
