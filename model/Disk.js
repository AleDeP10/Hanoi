export default class Disk {
    constructor(
        id,         // number
        position,   // Bar
        level,      // int 
        size        // int      
    ) {
        this.id = id;
        this.position = position;
        this.level = level;
        this.size = size;
    }
}