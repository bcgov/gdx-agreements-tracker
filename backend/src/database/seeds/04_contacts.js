exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("contacts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("contacts").insert([
        {
          id: 1,
          first_name: "Mike",
          last_name: "Lara",
          job_title: "Technical Analyst",
          ministry_id: "2",
          notes: "This is a note about Lara",
        },
        {
          id: 2,
          first_name: "Sarah",
          last_name: "Gonzalez",
          job_title: "Business Analyst",
          ministry_id: "3",
          notes: "This is a note about Sarah",
        },
        {
          id: 3,
          first_name: "John",
          last_name: "Lara",
          job_title: "Developer",
          ministry_id: "2",
          notes: "This is a note about John",
        },
        {
          id: 4,
          first_name: "Jacob",
          last_name: "Valencia",
          job_title: "IT Admin",
          ministry_id: "3",
          notes: "This is a note about Jacob",
        },
        {
          id: 5,
          first_name: "Eric",
          last_name: "Richardson",
          job_title: "Director",
          ministry_id: "2",
          notes: "This is a note about Eric",
        },
      ]);
    });
};
