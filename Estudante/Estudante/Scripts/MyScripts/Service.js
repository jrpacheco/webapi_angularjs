app.service('EstudanteService', function ($http) {
    
    // Cria um novo registro
    this.post = function (Estudante) {
        var request = $http({
            method: 'POST',
            url: '/api/EstudantesAPI',
            data: Estudante
        });
        return request;
    }

    // Pegar um registro
    this.get = function (Id) {
        return $http.get('/api/EstudantesAPI/' + Id);
    }

    //Pega todos os registros
    this.getEstudantes = function () {
        return $http.get('/api/EstudantesAPI');
    }

    // Atualizar um registro
    this.put = function (Id, Estudante) {
        var request = $http({
            method: 'PUT',
            url: '/api/EstudantesAPI/' + Id,
            data: Estudante
        });
        return request;
    }

    // Excluir um registro
    this.delete = function (Id) {
        var request = $http({
            method: 'DELETE',
            url: '/api/EstudantesAPI/' + Id
        });
        return request;
    }
});