// const { failedQuery, noQuery, userRequires } = require("./admin_form");

// //controller/index.js
// module.exports = (model, capability, what) => {
//   /**
//    * Get all items.
//    *
//    * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
//    * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
//    * @returns {object}
//    */
//   const getAll = async (request, reply) => {
//     userRequires(request, what, capability);

//     try {
//       const result = await model.findAll();
//       return result ? result : [];
//     } catch (err) {
//       return failedQuery(reply, err, what);
//     }
//   };

//   /**
//    * Get a specific item by ID.
//    *
//    * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
//    * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
//    * @returns {object}
//    */
//   const getOne = async (request, reply) => {
//     userRequires(request, what, capability);
//     const targetId = Number(request.params.id);
//     try {
//       const result = await model.findById(targetId);
//       return !result || !result.length
//         ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
//         : result[0];
//     } catch (err) {
//       return failedQuery(reply, err, what);
//     }
//   };
//   /**
//    * Add an item based on request body info.
//    *
//    * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
//    * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
//    * @returns {object}
//    */
//   const addOne = async (request, reply) => {
//     userRequires(request, what, capability);
//     try {
//       const result = await model.addOne(request.body);
//       return result || noQuery(reply, `The ${what.single} could not be added.`);
//     } catch (err) {
//       return failedQuery(reply, err, what);
//     }
//   };
//   /**
//    * Update an item by ID. Use passed info from the request body.
//    *
//    * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
//    * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
//    * @returns {object}
//    */
//   const updateOne = async (request, reply) => {
//     userRequires(request, what, capability);
//     try {
//       const result = await model.updateOne(Number(request.params.id), request.body);
//       return result || noQuery(reply, `The ${what.single} could not be updated.`);
//     } catch (err) {
//       return failedQuery(reply, err, what);
//     }
//   };
//   /**
//    * Delete a user by user ID.
//    *
//    * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
//    * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
//    * @returns {object}
//    */
//   const deleteOne = async (request, reply) => {
//     userRequires(request, what, capability);

//     const target = {
//       id: Number(request.params.id),
//     };
//     try {
//       const result = await model.removeOne(target);
//       return (
//         result || noQuery(reply, `The ${what.single} ${request.params.id} could not be deleted.`)
//       );
//     } catch (err) {
//       return failedQuery(reply, err, what);
//     }
//   };
//   return {
//     getAll,
//     getOne,
//     addOne,
//     updateOne,
//     deleteOne,
//   };
// };

import adminForm from "../admin_form.js";

export const useController = (model, capability, what) => {

  const { failedQuery, noQuery, userRequires } = adminForm();
  /**
   * Get all items.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const getAll = async (request, reply) => {
    userRequires(request, what, capability);

    try {
      const result = await model.findAll();
      return result ? result : [];
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  /**
   * Get a specific item by ID.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const getOne = async (request, reply) => {
    userRequires(request, what, capability);
    const targetId = Number(request.params.id);
    try {
      const result = await model.findById(targetId);
      return !result || !result.length
        ? noQuery(reply, `The ${what.single} with the specified id does not exist.`)
        : result[0];
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  /**
   * Add an item based on request body info.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const addOne = async (request, reply) => {
    userRequires(request, what, capability);
    try {
      const result = await model.addOne(request.body);
      return result || noQuery(reply, `The ${what.single} could not be added.`);
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  /**
   * Update an item by ID. Use passed info from the request body.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const updateOne = async (request, reply) => {
    userRequires(request, what, capability);
    try {
      const result = await model.updateOne(Number(request.params.id), request.body);
      return result || noQuery(reply, `The ${what.single} could not be updated.`);
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  /**
   * Delete a user by user ID.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @param   {FastifyReply}   reply   FastifyReply is an instance of the standard http or http2 reply types.
   * @returns {object}
   */
  const deleteOne = async (request, reply) => {
    userRequires(request, what, capability);

    const target = {
      id: Number(request.params.id),
    };
    try {
      const result = await model.removeOne(target);
      return (
        result || noQuery(reply, `The ${what.single} ${request.params.id} could not be deleted.`)
      );
    } catch (err) {
      return failedQuery(reply, err, what);
    }
  };

  return { getAll, getOne, addOne, updateOne, deleteOne };
};

export default useController;
