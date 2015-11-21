import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'canvas',
    width: 1000,
    height:500,
    attributeBindings:['width', 'height'],
    classNames: ['touch-canvas'],

    ctx: null,
    pencilDown: false,
    
    didInsertElement(){
        console.log('canvas insertered');
        let ctx = this.get('element').getContext('2d');
        this.set('ctx', ctx);
    },
    click(e){
        let x = e.clientX;
        let y = e.clientY;
        console.log('clicked at x=' + x + '. y = ' + y + " .");
        this.renderDot(x, y);
        this.sendAction('saveTouch', x, y);
    },
    mouseDown(e){
        console.log('mouseDown');
        this.set('pencilDown', true);
    },
    mouseUp(e){
        console.log('mouseUp');
        this.set('pencilDown', false);
    },
    mouseLeave(e){
        console.log('mouseLeave');
        this.set('pencilDown', false);
    },
    mouseEnter(e){
        console.log('mouseEnter');
    },
    mouseMove(e){
        let x = e.offsetX;
        let y = e.offsetY;
        if (this.get('pencilDown')){
            this.renderDot(x, y);
        }
    },
    renderAll(x, y){
    },

    clearCanvas(){
        let ctx = this.get('ctx');
        let canvas = ctx.canvas;

        ctx.clearRect(0,0,canvas.width, canvas.height);
    },
    renderDot(x, y){
        let ctx = this.get('ctx');
        ctx.fillStyle = '#ffccbb';
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2*Math.PI, true);
        ctx.stroke();
        ctx.fill();
    },
    renderAllDots(){
        this.clearCanvas();

        let touches = this.get('touches');

        touches.forEach((touch) => {
            let x = touch.get('x');
            let y = touch.get('y');
            this.renderDot(x,y);
        });
    },

    touchesChanged: Ember.observer('touches.[]', function() {
        Ember.run.once(() => {
            console.log('touch changed', this.get('touches.length'));
            this.renderAllDots();
        })
    })

});
