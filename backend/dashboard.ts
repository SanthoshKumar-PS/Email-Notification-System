import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import queue from "./queue";

export const startDashboard = () => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/admin/queues");

  createBullBoard({
    queues: [new BullMQAdapter(queue)],
    serverAdapter,
  });

  const app = express();
  app.use("/admin/queues", serverAdapter.getRouter());
  const port = 3001;
  app.listen(port, () =>
    console.log(`📊 Bull Board running at http://localhost:${port}/admin/queues`)
  );
};
