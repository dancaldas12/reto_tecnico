Feature: API /appointment/{insureId}

    Scenario Outline: CASO002_Registrar nuevo caso
    Given se registra un nuevo caso con los datos <insureId> <schedule> <countryISO>
    And retorna los siguientes valores <ruta>
    When envio la peticion al servicio
    Then deberia recibir una respuesta del API en un tiempo maximo de 5 segundos con <status>

    Examples:
      | insureId | schedule             | countryISO | status  | ruta               |
      | 00001    | 10043420243009123000 | PE         | success | 00000-appointment  |
      | 00002    | 10043420243009123000 | CL         | success | 00000-appointment  |