const drawerObject = {
    canvas: undefined,
    init(drawerId) {
        drawerObject.canvas = document.getElementById(drawerId);
        drawerObject.canvas.width = 1000;
        drawerObject.canvas.height = 1000;
        drawerObject.canvas.addEventListener('click', drawerObject.drawClick);
    },
    drawClick(event) {
        // const point = {
        //     x: e.clientX - drawerObject.canvas.offsetLeft,
        //     y: e.clientY - drawerObject.canvas.offsetTop,
        // };
        let totalOffsetX = 0;
        let totalOffsetY = 0;
        let canvasX = 0;
        let canvasY = 0;
        let currentElement = this;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            currentElement = currentElement.offsetParent;
        }
        while (currentElement);

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        drawerObject.drawRect({x: canvasX, y: canvasY});
    },

    drawRect(point) {
        const ctx = drawerObject.canvas.getContext('2d');
        // ctx.beginPath();
        // ctx.moveTo(point.x, point.y);
        // ctx.lineTo(100, 75);
        // ctx.lineTo(100, 25);
        // ctx.fill();
        // ctx.strokeRect(point.x, point.y, 50, 30);
        ctx.fillText("alliluya!", point.x, point.y);
    },
};
export default drawerObject;
