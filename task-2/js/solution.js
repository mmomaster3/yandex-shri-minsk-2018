(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var visualizeSolution = root.SHRI_ISLANDS.visualizeSolution

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        // done: подсчитать кол-во островов на карте
        var counter = 0;
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[0].length; j++) {
                if (map[i][j] == ISLAND) {
                    if (j != map[0].length - 1 && map[i][j+1] == ISLAND) { visualizeSolution(i,j,'половина острова'); continue; }
                    if (i != map.length - 1 && map[i+1][j] == ISLAND) { visualizeSolution(i,j,'половина острова'); continue; }
                    counter++;
                    visualizeSolution(i,j,'остров');
                }
                else{
                    visualizeSolution(i,j,'вода');
                }
            }
        }
        return counter;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
