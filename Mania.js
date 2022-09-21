class Mania {
    laneColor = '#00203F';
    noteColor = '#ADEFD1';
    borderColor = '#FFFFFF';
    borderSize = 1;
    noteHeight = 25;
    noteSpeed = 8;
    notes = [
        {
            lane: 1,
            y: 0,
        }
    ];
    songBpm = 180;

    constructor({canvas, width, height, laneWidth, lanes}) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.laneWidth = laneWidth;
        this.lanes = lanes;

        this.laneCenter = this.findCenter();

        this.setup();
    }

    setup() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    draw() {
        requestAnimationFrame(() => this.draw());

        this.ctx.clearRect(0, 0, this.width, this.width);

        this.drawLanes();
        this.drawNotes();
    }

    main() {
        this.draw();

        setInterval(() =>
            this.generateNote()
        , 1000 * 60 / this.songBpm);
    }

    drawLanes() {
        this.lanes.forEach((key, index) => {
            const xPos = this.laneCenter + (this.laneWidth * index);

            this.ctx.fillStyle = this.laneColor;
            this.ctx.fillRect(
                xPos + this.borderSize,
                0,
                this.laneWidth - (this.borderSize * 2),
                this.height
            );

            // Draw borders
            this.ctx.fillStyle = this.borderColor;
            this.ctx.fillRect(xPos, 0, this.borderSize, this.height);
            this.ctx.fillRect(
                xPos + this.laneWidth - this.borderSize,
                0,
                this.borderSize,
                this.height
            );
        });
    }

    drawNotes() {
        this.ctx.fillStyle = this.noteColor;

        this.notes.forEach((note, index) => {
            // Offset 300 to avoid jitter
            if (note.y > this.height + 300) {
                this.notes.splice(index, 1);
                return;
            }

           this.ctx.fillRect(
               this.getLaneXPos(note.lane),
               note.y,
               this.laneWidth - this.borderSize * 2,
               this.noteHeight
           );

           note.y += this.noteSpeed;
        });
    }

    generateNote() {
        this.notes.push({
            lane: this.randomInt(1, this.lanes.length),
            y: 0
        });
    }

    // Utilities
    findCenter() {
        return (this.width - (this.laneWidth * this.lanes.length)) / 2;
    }

    getLaneXPos(laneNumber) {
        return this.laneCenter + this.laneWidth * (laneNumber - 1) + this.borderSize;
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
}

export default Mania;
