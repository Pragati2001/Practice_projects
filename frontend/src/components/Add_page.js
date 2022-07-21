import React, { useEffect, useState } from "react";
import "../styles/add.css";
import Axios from "axios";
export default function Add_page() {
  const [bill, setBill] = useState("");
  const [pay, setPay] = useState("");
  const [unit, setUnit] = useState("");
  const [amt, setAmt] = useState("");
  const [name, setName] = useState("");
  const [List, setList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5001/get").then((response) => {
      setList(response.data);
    });
  }, []);

  const submit_btn = () => {
    Axios.post("http://localhost:5001/get/insert", {
      bill: bill,
      pay: pay,
      unit: unit,
      amt: amt,
      name: name,
    }).then(() => {
      alert("succesfully insert!!");
    });
    setList([
      ...List,
      {
        bill: bill,
        pay: pay,
        unit: unit,
        amt: amt,
        name: name,
      },
    ]);
  };

  const delete_btn = (name) => {
    Axios.delete(`http://localhost:5001/get/delete/${name}`);
  };

  return (
    <div>
      <form className="form">
        <label>BILL DATE</label>
        <input
          type="date"
          name="bill_date"
          onChange={(e) => {
            setBill(e.target.value);
          }}
        ></input>
        <label>PAID DATE</label>
        <input
          type="date"
          name="paid_date"
          onChange={(e) => {
            setPay(e.target.value);
          }}
        ></input>
        <label>UNIT CONSUME</label>
        <input
          type="text"
          name="unit_consume"
          onChange={(e) => {
            setUnit(e.target.value);
          }}
        ></input>
        <label>AMOUNT</label>
        <input
          type="Number"
          name="amt"
          onChange={(e) => {
            setAmt(e.target.value);
          }}
        ></input>
        <label>NAME</label>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        {pay && bill && unit && amt && name && (
          <button onClick={submit_btn}>Submit</button>
        )}

        {List.map((val) => {
          return (
            <table className="table">
              <tr className="row">
                <th className="table_head">bill_date:{val.bill_date}</th>
                <th>pay_date:{val.paid_date}</th>
                <th>amount:{val.amount}</th>
                <th>Name:{val.name}</th>

                <button
                  onClick={() => {
                    delete_btn(val.name);
                  }}
                >
                  Delete
                </button>
              </tr>
            </table>
          );
        })}
      </form>
    </div>
  );
}
