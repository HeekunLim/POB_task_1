// import instance from "/network/axios";
import Axios from "axios";
import React from "react";

const List = () => {
    const [data, setData] = React.useState();

    const onClick = () => {
        Axios
          .get("https://api.github.com/repos/angular/angular-cli/issues?sort=comments-desc")
          .then((response) => {
            setData(response.data);
          });
      };

    return (
        <div>
            <h1>리스트</h1>
            <button onClick={onClick}>불러오기</button>
            {JSON.stringify(data)}
        </div>
    );
};

export default List;