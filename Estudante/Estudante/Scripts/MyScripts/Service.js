
app.service('EstudanteService', function ($http) {

    // Cria um novo registro
    this.post = function (Estudante) {
        var request = $http({
            method: 'POST',
            url: 'api/EstudantesAPI',
            data: Estudante
        });
        return request;
    }
});