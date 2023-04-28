const fp = require("fastify-plugin");

const fastifyPayload = async (fastify) => {
  const addPayload = async (request, reply, payload) => {
    payload = {
      data: payload,
    };
    return payload;
  };

  fastify.addHook("preSerialization", addPayload);
};

module.exports = fp(fastifyPayload, {
  fastify: "4.x",
  name: "fastifyPayload",
});
