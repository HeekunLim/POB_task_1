import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
    // user.avatar_url, body
    const [gitIssue, setGitIssue] = React.useState([]);
    const {gitIssueNumber} = useParams();

    React.useEffect(()=>{
        Axios
            .get("https://api.github.com/repos/angular/angular-cli/issues/" + gitIssueNumber, {
                headers: {Authorization: "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"},
            })
            .then((response) => {
                let newData = {};

                newData.number = response.data.number;
                newData.title  = response.data.title;
                newData.login = response.data.user.login;
                newData.comments = response.data.comments;
                newData.created_at = response.data.created_at.substr(0, 10);
                newData.avatar_url = response.data.user.avatar_url;
                newData.body = response.data.body;

                setGitIssue(newData);
            });
    }, [])

    return (
        <div>
            <h1>디테일</h1>
            <img src={gitIssue.avatar_url} alt="" style={{width: "50px"}}/>
            <p>{gitIssue.number}</p>
            <p>{gitIssue.title}</p>
            <p>{gitIssue.login}</p>
            <p>{gitIssue.created_at}</p>
            <p>{gitIssue.comments}</p>
            <p style={{ whiteSpace: "pre-line" }}>{gitIssue.body}</p>
        </div>
    );
};

export default Detail;