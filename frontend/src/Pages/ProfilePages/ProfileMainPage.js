import React, { Fragment, useState } from "react";
import "../styles/ProfilePage/ProfileMainPage.css";
import Profile from "./ProfileUser";
import Orders from "./OrdersUser";
import Inbox from "./InboxUser";
import ProfilePageMenu from "./ProfilePageMenu";

const ProfileMainPage = () => {
  const [active, setActive] = useState(1);
  return (
    <Fragment>
      <div className="profilepage">
        <div className="user-div2">
          <ProfilePageMenu active={active} setActive={setActive} />
        </div>
        <div className="div3">
          {active === 1 && <Profile />}
          {active === 2 && <Orders />}
          {active === 3 && <Inbox />}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileMainPage;
