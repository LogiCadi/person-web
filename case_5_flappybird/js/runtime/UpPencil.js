// import { Pencil } from './Pencil.js';

 class UpPencil extends Pencil {
// export class UpPencil extends Pencil {
    constructor(top) {
        const image = UpPencil.getImage('pencilUp');
        super(image, top);
        this.y = -(this.height - this.top)
    }
   
}