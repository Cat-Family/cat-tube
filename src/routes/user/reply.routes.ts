import express from "express"
import { createReplyHandler, deleteReplyHandler, getOwnRepliesHandler, updateReplyHandler } from "../../controller/reply.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import { createReplySchema, deleteReplySchema, updateReplySchema } from "../../schema/reply.schema";

const router = express.Router();

router.post("/", requireUser, validateResource(createReplySchema), createReplyHandler);

router.get("/", requireUser, getOwnRepliesHandler);

router.put("/:id", requireUser, validateResource(updateReplySchema), updateReplyHandler);

router.delete("/:id", requireUser, validateResource(deleteReplySchema), deleteReplyHandler);

export default router;