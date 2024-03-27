exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.billing_period_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.billing_period_option").insert([
        {
          value: "Jan",
          label: "January",
        },
        {
          value: "Feb",
          label: "February",
        },
        {
          value: "Mar",
          label: "March",
        },
        {
          value: "Apr",
          label: "April",
        },
        {
          value: "May",
          label: "May",
        },
        {
          value: "Jun",
          label: "June",
        },
        {
          value: "Jul",
          label: "July",
        },
        {
          value: "Aug",
          label: "August",
        },
        {
          value: "Sep",
          label: "September",
        },
        {
          value: "Oct",
          label: "October",
        },
        {
          value: "Nov",
          label: "November",
        },
        {
          value: "Dec",
          label: "December",
        },
      ]);
    });
};
