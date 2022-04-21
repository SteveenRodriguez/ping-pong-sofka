(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.plying = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    };

    self.Board.prototype = {
        get elements() {
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    };
})();


(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.heght = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    };

    self.Bar.prototype = {
        down: function () {
            this.y += speed;
        },
        up: function () {
            this.x -= speed;
        }
    };
})();

(function () {
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    };

    self.BoardView.prototype = {
        clean: function () {
            this.context.clearRect(0, 0, this.board.width, this.board.height);
        },
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.context, el);
            };
        },

        check_collitions: function () {
            for (var i = this.board.bars.length - 1; i >= 0; i--) {
                var bar = this.board.bars[i];
                if (hit(bar, this.board.ball)) {
                    this.board.ball.collition(bar);
                }

            };
        },
    };

    function draw(ctx, element) {
        if (element !== null && element.hasOwnProperty("kind")) {
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }
        }

    }

}());

document.addEventListener("keydown", function (ev) {
    if (ev.keyCode == 38) {
        bar.up();
    } else if ()
});

self.window.addEventListener("load", main);

function main() {
    var board = new Board(800, 400);
    var bar = new Bar(20, 100, 40, 100, board);
    var bar2 = new Bar(735, 100, 40, 100, board);
    console.log(bar);
    console.log(board);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas, board);
    board_view.draw();

}