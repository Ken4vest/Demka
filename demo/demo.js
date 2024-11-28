const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

class Order {
  constructor(
    id,
    adddate,
    view,
    model,
    problem,
    fio,
    numberphone,
    status,
    responsible,
    master,
    coments,
    complitedOrder
  ) {
    this.id = id;
    this.adddate = adddate;
    this.view = view;
    this.model = model;
    this.problem = problem;
    this.fio = fio;
    this.numberphone = numberphone;
    this.status = status || "Новая заявка";
    this.responsible = responsible;
    this.master = master;
    this.coments = coments || [];
    this.complitedOrder = complitedOrder;
  }
}

const repo = [];

app.get("/orders", (req, res) => {
  res.send(repo);
});

app.post("/orders", (req, res) => {
  const neworder = new order(
    repo.length + 1,
    req.body.adddate,
    req.body.view,
    req.body.model,
    req.body.numberphone,
    req.body.problem,
    req.body.fio,
    req.body.status
  );
  repo.push(neworder);
  res.send(neworder);
});

app.put("/orders/:id", (req, res) => {
  const orderid = req.params.id;
  const orderupdate = req.body;
  const orderindex = repo.findIndex((order) => order.id === parseInt(orderid));

  if (orderindex === -1) {
    return res.status(404).send("Заявка не найдена");
  }
  repo[orderindex].problem = orderupdate.problem || repo[originindex].problem;
  repo[originindex].problem = orderupdate.status || repo[originindex].status;
  repo[originindex].responsible =
    orderupdate.responsible || repo[originindex].responsible;
  repo[originindex].master = orderupdate.master || repo[originindex].master;
  repo[originindex].coments = orderupdate.coments || repo[originindex].coments;
  res.send(repo[originindex]);
});

app.get("/statistics", (req, res) => {
  const complitedOrders = repo.filter((order) => order.status === "Завершена");
  const totalStayTime = 0;
  complitedOrders.forEach((order) => {
    const startdate = new Date(order.adddate);
    const endate = new Date(order.complitedOrder);
    const stayTime = (startdate - endate) / (1000 * 60 * 60);
    totalStayTime += stayTime;
  });

  const averageStayTime =
    completedOrders.length > 0 ? totalStayTime / completedOrders.length : 0;
  res.send({
    completedOrdersCount: completedOrders.length,
    averageStayTime: averageStayTime,
  });
});

app.listen(3000);
