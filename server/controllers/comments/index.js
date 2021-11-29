const { Comment, Service } = require("../../models");

module.exports = {
  comment: {
    post: async (req, res) => {
      const service_id = req.params.serviceId;
      const { user_id, message, likes } = req.body;

      if (!message || !likes) {
        return res.send("Empty body");
      } else {
        const isExist = await Comment.findOne({
          where: {
            user_id,
            service_id,
          },
        });

        if (isExist) {
          return res.send("Already Written");
        } else {
          const created = await Comment.create({
            user_id,
            service_id,
            message,
            likes,
          });

          // const count = await Comment.count({
          //   where: { service_id },
          // });

          // await Service.update({
          //   total_comments: count,
          //   where: { id: service_id },
          // });

          const comment = await Comment.findOne({
            attributes: ["id", "message", "likes", "createdAt"],
            where: { id: created.id },
          });

          try {
            return res.status(201).json({ comment });
          } catch (err) {
            return res.status(500).send("Server Error");
          }
        }
      }
    },
    delete: async (req, res) => {
      const id = req.params.id;

      await Comment.destroy({
        where: { id },
      });

      try {
        return res.status(204).send("No Content");
      } catch (err) {
        return res.status(500).send("Server Error");
      }
    },
  },
};