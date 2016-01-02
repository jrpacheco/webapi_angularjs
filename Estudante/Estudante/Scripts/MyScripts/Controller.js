app.controller('EstudanteController', function ($scope, EstudanteService) {

    $scope.NovoRegistro = 1;

    carregarRegistros();

    function carregarRegistros() {        
        var lista = EstudanteService.getEstudantes();
        lista.then(function (pl) {
            $scope.Estudantes = pl.data;
        }, function (errorPl) {
            alert('Falha ao carregar estudantes', errorPl);
        });
    }

    $scope.get = function (Estudante) {
        var promiseGetSingle = EstudanteService.get(Estudante.Id);
        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.Nome = res.Nome;
            $scope.Sobrenome = res.Sobrenome;
            $scope.Escola = res.Escola;
            $scope.DataNascimento = res.DataNascimento;
            $scope.IsNewRecord = 0;
        },
        function (errorPl) {
            alert('Falha ao buscar registro', errorPl);
        });
    }
});