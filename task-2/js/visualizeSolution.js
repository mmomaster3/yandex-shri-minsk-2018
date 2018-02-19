(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var element = root.SHRI_ISLANDS.element;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */
    function visualizeSolution(i, j, stage){
        // done: визуализировать работу алгоритма
        var result = element('div', 'visualize', i + ',' + j + ':' + stage);
        document.querySelector('.outer').appendChild(result);
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
