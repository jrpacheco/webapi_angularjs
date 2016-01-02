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
            $scope.NovoRegistro = 0;
        },
        function (error) {
            alert('Falha ao buscar registro', error);
        });
    }

    $scope.save = function () {
        var Estudante = {
            Id: $scope.Id,
            Nome: $scope.Nome,
            Sobrenome: $scope.Sobrenome,
            Escola: $scope.Escola,
            DataNascimento: $scope.DataNascimento
        };

        if ($scope.NovoRegistro === 1) {
            var promisePost = EstudanteService.post(Estudante);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                carregarRegistros();
            }, function (erro) {
                alert("Erro: " + erro.status + " " + erro.statusText);
            });
        } else {
            var promisePut = EstudanteService.put($scope.Id, Estudante);
            promisePut.then(function (pl) {
                $scope.Message = "Registro atualizado com sucesso";
                carregarRegistros();
            }, function (erro) {
                alert("Erro: " + erro.status + " " + erro.statusText);
            });
        }
    };
    
    $scope.delete = function () {
        var promiseDelete = EstudanteService.delete($scope.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deletado com sucesso";
            $scope.Id = 0;
            $scope.Nome = "";
            $scope.Sobrenome = "";
            $scope.Escola = "";
            $scope.DataNascimento = "";

            carregarRegistros();

        }, function (erro) {
            alert("Erro: " + erro.status + " " + erro.statusText);
        });
    }
    
    $scope.clear = function () {
        $scope.NovoRegistro = 1;
        $scope.Id = 0;
        $scope.Nome = "";
        $scope.Sobrenome = "";
        $scope.Escola = "";
        $scope.DataNascimento = "";        
    }
});