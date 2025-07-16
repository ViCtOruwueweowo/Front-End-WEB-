import SideBar from "../Sidebar/Sidebar";
import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.wrapper}>
      <div className="d-flex flex-column flex-md-row">
        <SideBar />
        <div className={`${styles.mainContent} d-flex justify-content-center align-items-center flex-grow-1`}>
          <div className="bg-white rounded shadow-sm w-100" style={{ maxWidth: "1020px", minHeight: "600px", border: "1px solid rgba(0, 0, 0, 0.17)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
