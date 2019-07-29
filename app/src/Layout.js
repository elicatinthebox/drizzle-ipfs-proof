import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import IpfsStorageContractForm from "./components/IpfsStorageContractForm";

import logo from "./logo.png";


export default ({ accounts }) => (
  <div className="App">
  <div className="container">

    <div align="center">
      <h1 className="title">Proof of Existence</h1>
    </div>

      <div class="tile is-parent">
        <article class="tile is-child notification is-danger">
          <p class="title">Your Account</p>
          <div class="content">
          <AccountData accountIndex={0} units="ether" precision={3} />
          </div>
        </article>
    </div>
      <IpfsStorageContractForm account={accounts[0]} />
      </div>
    </div>

);
