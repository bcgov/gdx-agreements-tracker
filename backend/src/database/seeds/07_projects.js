
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          "id": 0,
          "project_number": "6273e4b5184bbcd3743fa42a",
          "project_name": "COMVOY"
        },
        {
          "id": 1,
          "project_number": "6273e4b54c2ef989e7f12c40",
          "project_name": "AVIT"
        },
        {
          "id": 2,
          "project_number": "6273e4b5f388de91f621f641",
          "project_name": "IPLAX"
        },
        {
          "id": 3,
          "project_number": "6273e4b543d4472d15a187be",
          "project_name": "VINCH"
        },
        {
          "id": 4,
          "project_number": "6273e4b5f26d48327aed050a",
          "project_name": "MICRONAUT"
        },
        {
          "id": 5,
          "project_number": "6273e4b5ace8fed62d2f44a4",
          "project_name": "DIGIQUE"
        },
        {
          "id": 6,
          "project_number": "6273e4b51869b95e98ebb2cf",
          "project_name": "ATGEN"
        },
        {
          "id": 7,
          "project_number": "6273e4b56da094cac21357e5",
          "project_name": "NIKUDA"
        },
        {
          "id": 8,
          "project_number": "6273e4b56b7c8d2218022147",
          "project_name": "DAISU"
        },
        {
          "id": 9,
          "project_number": "6273e4b592349577b364ff58",
          "project_name": "ANARCO"
        },
        {
          "id": 10,
          "project_number": "6273e4b53580be3bc2b7d9b7",
          "project_name": "OPTICALL"
        },
        {
          "id": 11,
          "project_number": "6273e4b5106f82e2bd661b53",
          "project_name": "SINGAVERA"
        },
        {
          "id": 12,
          "project_number": "6273e4b527182a1e2eb9c20b",
          "project_name": "SPRINGBEE"
        },
        {
          "id": 13,
          "project_number": "6273e4b5174397b441938d98",
          "project_name": "VETRON"
        },
        {
          "id": 14,
          "project_number": "6273e4b5ac204a2b2e7e5a21",
          "project_name": "QUONK"
        },
        {
          "id": 15,
          "project_number": "6273e4b550f7b9e8d4cbf85a",
          "project_name": "DATACATOR"
        },
        {
          "id": 16,
          "project_number": "6273e4b5fe4213939ac1aa23",
          "project_name": "SONGLINES"
        }
      ]);
    });
};
