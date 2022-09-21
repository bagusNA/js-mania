class Mania {
    laneColor = '#00203F';
    noteColor = '#ADEFD1';
    buttonColor = '#6A7BA2';
    activeButtonColor = 'white';
    borderColor = '#FFFFFF';
    borderSize = 1;

    buttonHeight = 100;
    scoreZoneHeight = 125;
    noteHeight = 25;
    noteSpeed = 8;
    notes = [
        {
            lane: 1,
            y: 0,
        }
    ];
    
    isKeyHasPressedNote = false;
    pressedKey = [];
    songBpm = 180;
    score = 0;
    miss = 0;

    // TODO: add some songs

    constructor({canvas, width, height, laneWidth, lanes, scoreElement, missElement}) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.laneWidth = laneWidth;
        this.lanes = lanes.map((key) => ({key: key, isPressed: false}));

        this.scoreZoneY = this.height - this.scoreZoneHeight - this.buttonHeight;

        this.laneCenter = this.findCenter();
        this.pureLaneWidth = this.laneWidth - (this.borderSize * 2);
        
        this.scoreElement = scoreElement;
        this.missElement = missElement;

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
        this.drawButtons();
    }

    main() {
        this.setupControls();
        this.generateNote();

        this.draw();
    }

    drawLanes() {
        this.lanes.forEach((lane, index) => {
            const xPos = this.laneCenter + (this.laneWidth * index);

            this.ctx.fillStyle = this.laneColor;
            this.ctx.fillRect(
                xPos + this.borderSize,
                0,
                this.pureLaneWidth,
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

    drawButtons() {
        this.lanes.forEach((lane, index) => {
            this.ctx.fillStyle = lane.isPressed ? this.activeButtonColor : this.buttonColor;
            this.ctx.fillRect(
                this.getLaneXPos(index + 1), 
                this.height - this.buttonHeight,
                this.pureLaneWidth,
                this.buttonHeight
            );
        });
    }

    drawNotes() {
        this.ctx.fillStyle = this.noteColor;

        this.notes.forEach((note, index) => {
            // I don't even know why but we need offset to avoid note vertical jitter
            if (note.y > this.height) {
                this.notes.splice(index, 1);
                this.increaseMiss();
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

    // This includes scoring judgements
    setupControls() {
        document.addEventListener('keydown', pressedKey => {
            const key = pressedKey.key.toLowerCase();

            this.lanes.forEach((lane, laneIndex) => {
                const note = this.notes[0];

                // Prevents error if there's no note
                if (!note) return;

                if (lane.key !== key) return;

                lane.isPressed = true;

                if (
                    !this.isKeyHasPressedNote &&
                    note.lane === laneIndex + 1 &&
                    note.y <= this.height
                ) {
                    if (note.y >= this.scoreZoneY)
                        this.increaseScore();
                    else if (note.y < this.scoreZoneY)
                        this.increaseMiss();

                    this.notes.shift();
                    this.isKeyHasPressedNote = true;
                }
            });
        });

        document.addEventListener('keyup', pressedKey => {
            const key = pressedKey.key.toLowerCase();

            this.isKeyHasPressedNote = false;

            this.lanes.forEach(lane => {
                if (lane.key === key)
                    lane.isPressed = false;
            })
        });
    }

    generateNote() {
        setInterval(() =>
            this.notes.push({
                lane: this.randomInt(1, this.lanes.length),
                y: 0
            })
        , 1000 * 60 / this.songBpm);
    }

    increaseScore() {
        this.score++;
        this.scoreElement.innerHTML = this.score.toString();
    }

    increaseMiss() {
        this.miss++;
        this.missElement.innerHTML = this.miss.toString();
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
