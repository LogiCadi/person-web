// import { Pencil } from './Pencil.js';
// import { DataStore } from '../base/DataStore.js';

 class DownPencil extends Pencil {
// export class DownPencil extends Pencil {
    constructor(top) {
        const image = DownPencil.getImage('pencilDown');
        super(image, top);
        
        this.gap = DataStore.getInstance().gap
        this.y = this.gap + this.top
    }


}