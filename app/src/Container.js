import Layout from "./Layout";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    InterplanetaryStorage: state.contracts.InterplanetaryStorage,
    drizzleStatus: state.drizzleStatus,
  };
};

const Container = drizzleConnect(Layout, mapStateToProps);

export default Container;
